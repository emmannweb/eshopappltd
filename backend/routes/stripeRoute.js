const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth");
const {stripeCtrl}= require('../controllers/stripeController');



//router.get('/allusers', allUsers);
 router.post('/payment', isAuthenticated,  stripeCtrl);


module.exports = router; 