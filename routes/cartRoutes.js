const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.post("/updatecart", auth, cartController.addCart);
router.get("/getprod",auth,cartController.getCartProducts)
router.delete('/deletecart',auth,cartController.deleteCart)
module.exports = router;
