const UserModel=require('../models/UserModel')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const registerCode=async(req,res)=>{
    const user=req.body
    try{
         const Userpost=await UserModel.create(user)
         res.status(200).send({message:'Registration completed',Userpost})
    }
    catch(err){
        console.error(err)
        res.status(500).send({message:'Registration failed'})
    }
}
const loginCode = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    try {
        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const isValid=await bcrypt.compare(password,user.password)
        if (!isValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        const token=jwt.sign({userId:user._id},"secret_key",{
            expiresIn:"1h",
        })
        //res.status(200).send({ message: 'Login successful', user });
        res.json({token})
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Login failed' });
    }
};
module.exports={registerCode,loginCode}