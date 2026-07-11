const express = require("express");
const router = express.Router();
const {allUsers, singleUser, editUser, deleteUser}= require('../controllers/userController');
const {isAuthenticated, isAdmin} = require("../middleware/auth");


//router.get('/allusers', allUsers);
 router.get('/allusers', isAuthenticated, isAdmin, allUsers);
 router.get('/user/:id', isAuthenticated, singleUser);
 router.put('/admin/user/edit/:id', isAuthenticated, isAdmin, editUser);
 //User edit his own info
 router.put('/user/dashboard/edit/:id', isAuthenticated, editUser);
 router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

module.exports = router; 