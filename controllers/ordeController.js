const orderModel=require('../models/OrderModel')
const cardModel=require('../models/CartModel')
const productModel=require('../models/ProductModel')

const userModel=require('../models/UserModel')
const { v4 : uuidv4}=require('uuid')

const postOrder=async(req,res)=>{
    try {
    const  userId=req.user.id
    const Email=await userModel.findById(userId)
    const userEmail=Email.email
    const {customerName,customerPhone,customerAddress}=req.body;
    const currentDate = new Date();
const orderDate = currentDate
const estimateDeliverDate = new Date(currentDate);
estimateDeliverDate.setDate(currentDate.getDate() + 10);
//const estimateDeliverDate = estimateDeliver.toLocaleDateString();
    const orderStatus="Inprogress"
        const userCart = await cardModel.findOne({ userId });
        if (!userCart || !userCart.product.length) {
          return res.status(404).json({ message: "No items in cart" });
        }
        const products = userCart.product;
        let cartArray = [];
        let total =0;
        for (let i = 0; i < products.length; i++) {
          const productId = products[i].productId; 
          const quantity = products[i].quantity;
          const product = await productModel.findOne({ id: productId });
          if (product) {
            const cartprod={}
            //cartprod.title =product.title;
           // cartprod.description = product.description ;
          //  cartprod.image= product.image
          //  cartprod.price=product.price
            cartprod.quantity=quantity
            cartprod.productId=productId
            cartprod.totalPrize= product.price*quantity
            cartArray.push(cartprod);
            total += cartprod.totalPrize;
          } else {
            console.warn(`Product not found: ${productId}`);
          }
        }
        total=total.toFixed(2)
        const newOrder = new orderModel({  customerName,customerPhone, customerAddress, orderDate, estimateDeliverDate, product: cartArray,  totalAmount:total, orderStatus,orderId:uuidv4(),userId,userEmail
        });
        await newOrder.save();
        await cardModel.deleteOne({userId})
        res.status(200).send({message:"order added sucessfully",newOrder})
         
      } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    
}
const getorder = async (req, res) => {
    try {
        const userId = req.user.id;
         const orders = await orderModel.findOne({ userId });
         if (!orders || !orders.product.length) {
          return res.status(404).json({ message: "No items in cart" });
        }
        const products = orders.product;
        let cartArray = [];
        for(let i=0;i<products.length;i++){
          const productId = products[i].productId; 
          const quantity = products[i].quantity;
          const product = await productModel.findOne({ id: productId });
          if(product){
            const cartprod={}
            cartprod.title =product.title;
           cartprod.description = product.description ;
           cartprod.image= product.image
           cartprod.price=product.price
           cartprod.quantity=quantity
           cartArray.push(cartprod);
          }else{
            console.warn(`Product not found: ${productId}`);
          }
          

        }


        const totalAmount=orders.totalAmount 
        const  orderDate=orders.orderDate 
        const estimateDeliverDate=orders.estimateDeliverDate
        const orderId=orders.orderId
        const orderStatus=orders.orderStatus

          res.status(200).json({products:cartArray,totalAmount:totalAmount,orderDate:orderDate,estimateDeliverDate:estimateDeliverDate,orderId:orderId,orderStatus:orderStatus})

        // if (orders.length > 0) {
        //     res.status(200).send({ message: "Orders retrieved successfully", orders });
        // } else {
        //     res.status(404).send({ message: "No orders found for this user" });
        // }
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports={postOrder,getorder}