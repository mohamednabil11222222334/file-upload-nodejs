

import bcrypt from "bcrypt"


export const checkEmail=async(req,res,next)=>{


const isFound=await User.findOne({email:req.body.email})
if(isFound) return res.status(409).json({message:"email elready exists"})

req.body.password=bcrypt.hashSync(req.body.password,8)




next()
}