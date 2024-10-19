import jwt  from 'jsonwebtoken';
import  User  from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try{
       const token  = req.cookies.jwt;
       if(!token){
           return res.status(401).json({msg: "You are not authorized to access this route"});
       }    
       const decoded  = jwt.verify(token, process.env.JWT_SECRET);

       if(!decoded){
           return res.status(401).json({msg: "Invalid Token"});
       }

       const user  = await User.findById(decoded.userId).select("-password");
         if(!user){
              return res.status(404).json({msg: "User not found"});
         }
         req.user = user;
         next();
    }
    catch(err){
        console.log("Error  in protectRoute  middleware  : ",err.message);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}