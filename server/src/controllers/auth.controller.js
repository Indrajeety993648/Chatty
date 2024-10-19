
import  User  from "../models/user.model.js";
import bcrypt from 'bcryptjs';  
import { generateToken } from "../lib/utils.js";
import cloudinary from '../lib/cloudinary.js';  


// SignUp Controller ...
export  const signup  = async (req, res) => {
    const {fullName  , email , password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({msg: "All fields are required"});
        }   

        if(password.length < 6){
            return res.status(400).json({msg: "Password must be atleast 6 characters long"});
        }
        const user   = await  User.findOne({ email});
        if(user){
            return  res.status(400).json({msg : "User  already exists"});
        }

        const salt   =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser  = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePic: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1623122097/blank-profile-picture-973460_640_ekyv1s.png'
        })

        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            token,
        });
    }
    catch(err){
        console.log("Error  in signUp  controller  : ",err.message);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
};


// Login Controller 

export const login = async (req, res) => { 
    const {email , password} = req.body;
    try{
      const user  = await  User.findOne({email});
      if(!user){
        return  res.status(400).json({msg : " Invalid Credentials"});
      }

      const isPasswordCorrect   = await bcrypt.compare(password , user.password );
      if(!isPasswordCorrect){
        return res.status(400).json({msg : " Invalid Credentials"});
      }
      const token  = generateToken(user._id, res);
      console.log("logged in successfully")
      res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            // token
      })
    }   
    catch(err){
        console.log("Error  in login  controller  : ",err.message);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}


// LogOut Controller 

export const logout = (req, res) => {    
    try{
        res.clearCookie('token');
        res.status(200).json({msg: "Logged out successfully "});
    }
    catch(err){
        console.log("Error  in logout  controller  : ",err.message);
    }
}


// Update Profile Pic Controller ...

 export const updateProfilePic  = async (req, res) =>{
    try{
       const  {profilePic}  = req.body; 
       const userId = req.user._id;

       if(!profilePic){
           return res.status(400).json({msg: "Profile Pic is required"});
       }

       const uploadResponse  = await  cloudinary.uploader.upload(profilePic);

       const updateUser  = await User.findByIdAndUpdate(userId , {profilePic: uploadResponse.secure_url}, {new: true});
         res.status(200).json({
              _id: updateUser._id,
              fullName: updateUser.fullName,
              email: updateUser.email,
              profilePic: updateUser.profilePic
         });
    }
    catch(err){
        console.log("Error  in updateProfilePic  controller  : ",err.message);
    }
 }


// Check Auth Controller ...

export const checkAuth  = (req, res) => {
     try{
            res.status(200).json({user: req.user});
     }
     catch{
            console.log("Error  in checkAuth  controller  : ",err.message);
     }
}