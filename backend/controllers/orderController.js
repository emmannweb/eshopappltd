// const { findById } = require('../models/order');
const Order = require('../models/order');
const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


//display all orders
// exports.allOrders = async (req, res, next)=>{

//     try {
//         const orders = await Order.find().populate("user", "name").sort({createdAt: -1})
//         res.status(200).json({
//             success: true,
//             orders
//         })
//         next();
//     } catch (error) {
//         return next(new ErrorResponse('Server error', 500));
//     }
// }

//display all orders with pagination
exports.allOrders = async (req, res, next) => {

    try {

        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        // const count = await Order.count();
        const count = await Order.find({}).estimatedDocumentCount();

        const orders = await Order.find().populate("user", "name").sort({ createdAt: -1 })
            .skip(pageSize * (page - 1))
            .limit(pageSize)


        res.status(200).json({
            success: true,
            orders,
            page,
            pages: Math.ceil(count / pageSize),
            count,

        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}



//display my order
exports.ordersme = async (req, res, next) => {

    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            orders
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}


//display single order
exports.singleOrder = async (req, res, next) => {

    try {
        const singleOrder = await Order.findById(req.params.id);
        res.status(200).json({
            success: true,
            singleOrder
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}

//display single order
exports.deleteOrderAdmin = async (req, res, next) => {

    try {
        const deleteOrder = await Order.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "order deleted"
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}

//update order
exports.updateOrderAdmin = async (req, res, next) => {

    try {
        const order = await Order.findById(req.params.id);
        if (Order) {
            order.isPaid = true;
        }
        const updateOrder = await order.save();

        res.status(200).json({
            success: true,
            order: updateOrder,
            message: "order Paid"
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}

//delivered order
exports.deliverOrderAdmin = async (req, res, next) => {

    try {
        const order = await Order.findById(req.params.id);
        if (Order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }
        const deliveredOrder = await order.save();

        res.status(200).json({
            success: true,
            order: deliveredOrder,
            message: "order Delivered"
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}


// create orders
exports.createOrder = async (req, res, next) => {
    try {
        //const cookie = req.cookies['token'];
        if (req.body.orderItems.length === 0) {
            res.status(400).json({
                message: "Cart is empty"
            });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            });

            const newOrder = await order.save();
            //update order after purchase
            for (const index in order.orderItems) {
                const item = order.orderItems[index];
                const product = await Product.findById(item.product);
                product.countStock -= item.quantity;
                await product.save();
            }

            res.status(201).json({
                message: "New Order created",
                newOrder
            })
        }


    } catch (err) {
        next(err);
    }
}



//order summary
exports.orderSumaryAdmin = async (req, res, next) => {

    try {

        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    nbOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);

        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    nbUsers: { $sum: 1 }
                },
            },
        ]);

        const daylyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPrice' }
                },
            },
        ]);

        res.status(200).json({
            success: true,
            orders,
            users,
            daylyOrders

        })
        next();
    } catch (error) {
        return next(error);
        console.log(error);
    }
}


