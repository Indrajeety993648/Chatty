import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export  const getUserForSidebar = async (req, res) => {
    try{
       const loggedInUser  = req.user._id;
       const filteredUsers  = await User.find({_id: {$ne: loggedInUser}}).select("-password");

       res.status(200).json(filteredUsers);
    }
    catch(err){
       console.log("Error  in getUserForSidebar  controller  : ",err.message);
       res.status(500).json({
           msg: "Internal Server Error"
       });
    }
};

export  const getMessages = async (req, res) => {
    try{
      const {id : userToChatId}  =  req.params;
      const myId  = req.user._id;

      const messages  = await Message.find({
        $or : [{
            myId : myId,
            receiverId : userToChatId

        }, 
        {
            myId : userToChatId,
            receiverId : myId
        }]
      });

      res.status(200).json(messages);
    }
    catch(err){
        console.log("Error  in getMessages  controller  : ",err.message);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};

export const sendMessage = async (req, res) => {
    try{
       const {text , image} = req.body;
       const {id : recieverId} = req.params;

       const senderId  = req.user._id;

       let imageUrl ;
       if(image){
        const uploadedResponse  = await cloudinary.uploader.upload(image);
        imageUrl = uploadedResponse.secure_url;
       }

       const newMessage  = new Message({
           senderId,
           recieverId,
           text,
           image: imageUrl
       });


       await newMessage.save();


       // todo : realtime  functionality  goes here ...



       res.status(200).json(newMessage);
    }
    catch(err){
        console.log("Error  in sendMessage  controller  : ",err.message);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}