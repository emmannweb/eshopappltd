const express = require("express");
const router = express.Router();

const {createProduct, allProducts, singleProduct, editProduct, deleteProduct, createProductReview} = require("../controllers/productController");
const {isAuthenticated, isAdmin} = require("../middleware/auth");

const upload = require('../utils/multer');

router.post("/product/create", isAuthenticated, isAdmin, createProduct);
router.post("/product/:id/reviews", isAuthenticated,  createProductReview);
router.get("/products", allProducts);
router.get("/product/:id", singleProduct);
router.put("/product/edit/:id", isAuthenticated, isAdmin,  editProduct);
router.delete("/product/delete/:id", isAuthenticated, isAdmin, deleteProduct);




module.exports = router;