const express = require('express');
const router = express.Router();
const orderController=require('../controllers/ordeController')
const auth = require('../middlewares/auth');
//const { route } = require('./cartRoutes');
router.post('/postorder',auth,orderController.postOrder)
router.get('/getorder',auth,orderController.getorder)
module.exports = router;