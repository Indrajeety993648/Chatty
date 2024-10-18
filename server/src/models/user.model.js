import mongoose  from 'mongoose';

const userSchema   = new mongoose.Schema({      
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    profilePic:{
        type: String,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1623122097/blank-profile-picture-973460_640_ekyv1s.png'
    }
    
}, {
    timestamps: true
});

const User   = mongoose.model('User', userSchema);
export default User;
