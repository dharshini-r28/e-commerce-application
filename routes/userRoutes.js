const express=require('express')
const userController=require('../controllers/userController')
const Router=express.Router()
Router.post('/postDetails', userController.registerCode);
Router.post('/login', userController.loginCode);
module.exports=Router


























