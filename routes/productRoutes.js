const express=require('express')
const productController=require('../controllers/productController')
const auth=require('../middlewares/auth')
const Router=express.Router()
Router.get("/products",auth,productController.getAllProduct)
Router.post("/postproduct",productController.sendp)
Router.put("/updateproduct",productController.updatec)
Router.delete("/deleteproduct",productController.deletecode)
module.exports=Router;