const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const UserShema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"username is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"This email is already exists"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    }

})
//hash password before saving user to the database
//userschema.pre is a middleware
UserShema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next()}
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt)
        next()
    })
const UserModel=mongoose.model('User',UserShema)
module.exports=UserModel