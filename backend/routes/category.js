const express = require("express");
const router = express.Router();

const {create, allcategories, deletecategory, updatecategory, singlecategory} = require("../controllers/category");
const {isAuthenticated, isAdmin} = require("../middleware/auth");

//ROUTES    /API/V1/CATEGORY/CREATE  (EX:)
router.post("/category/create", isAuthenticated, isAdmin, create);
router.get("/category/all",  isAuthenticated, isAdmin, allcategories);
router.delete("/category/delete/:id",  isAuthenticated, isAdmin,  deletecategory);
router.put("/product/category/update/:id", isAuthenticated, isAdmin,  updatecategory);
router.get("/product/category/show/:id",   singlecategory);




module.exports = router;