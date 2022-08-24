const express = require("express");
const router = express.Router();

const {
      createOrder,
      allOrders,
      ordersme,
      singleOrder,
      deleteOrderAdmin,
      updateOrderAdmin,
      deliverOrderAdmin,
      orderSumaryAdmin } = require("../controllers/orderController");

const { isAuthenticated, isAdmin } = require("../middleware/auth");

//ROUTES    /API/ORDER/CREATE  (EX:)
router.post("/order/create", isAuthenticated, createOrder);
router.get("/orders/me", isAuthenticated, ordersme);
router.get("/orders/all", isAuthenticated, isAdmin, allOrders);
router.get("/ordersingle/:id", isAuthenticated, singleOrder);
router.get("/ordersingle/admin/:id", isAuthenticated, isAdmin, singleOrder);
router.delete("/orderdelete/admin/:id", isAuthenticated, isAdmin, deleteOrderAdmin);
router.put("/orderupdate/admin/pay/:id", isAuthenticated, isAdmin, updateOrderAdmin);
router.put("/orderdelivered/admin/:id", isAuthenticated, isAdmin, deliverOrderAdmin);
router.get("/orders/summary", isAuthenticated, isAdmin, orderSumaryAdmin);



module.exports = router;


