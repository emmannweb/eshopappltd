import { orderRepo } from "../repo/orderRepo";
import { productRepo } from "../repo/productRepo";
import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repo/userRepo";

//display all orders with pagination
export const allOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    // count
    const count = await orderRepo.count();
    const orders = await orderRepo.findOrdersAndPopulate(pageSize, page);

    res.status(200).json({
      success: true,
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    return next(error);
  }
};

//display my order
export const ordersme = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderRepo.myOrders(req.user?.id);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(error);
  }
};

// //display single order
exports.singleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const singleOrder = await orderRepo.findById(req.params.id);
    res.status(200).json({
      success: true,
      singleOrder,
    });
  } catch (error) {
    return next(error);
  }
};

// //display single order
exports.deleteOrderAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteOrder = await orderRepo.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "order deleted",
    });
  } catch (error) {
    return next(error);
  }
};

// //update order
export const updateOrderAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderRepo.findById(req.params.id);
    if (order) {
      order.isPaid = true;
    }
    const updateOrder = await order!.save();

    res.status(200).json({
      success: true,
      order: updateOrder,
      message: "order Paid",
    });
  } catch (error) {
    return next(error);
  }
};

// //delivered order
export const deliverOrderAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderRepo.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }
    const deliveredOrder = await order!.save();

    res.status(200).json({
      success: true,
      order: deliveredOrder,
      message: "order Delivered",
    });
  } catch (error) {
    return next(error);
  }
};

// // create orders
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({
        message: "Cart is empty",
      });
    } else {
      const order = await orderRepo.create({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user?._id,
      });

      //update product after purchase
      for (const index in order.orderItems) {
        const item = order.orderItems[index];
        const id = item?.product.toString();
        const product = await productRepo.findById(id);
        product!.countStock -= item.quantity;
        await product!.save();
      }

      res.status(201).json({
        success: true,
        message: "New Order created",
        order,
      });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// //order summary
export const orderSumaryAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderRepo.aggregate([
      {
        $group: {
          _id: null,
          nbOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const users = await userRepo.aggregate([
      {
        $group: {
          _id: null,
          nbUsers: { $sum: 1 },
        },
      },
    ]);

    const products = await productRepo.aggregate([
      {
        $group: {
          _id: null,
          nbProducts: { $sum: 1 },
        },
      },
    ]);

    const daylyOrders = await orderRepo.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      orders,
      users,
      daylyOrders,
      products,
    });
  } catch (error) {
    return next(error);
    console.log(error);
  }
};
