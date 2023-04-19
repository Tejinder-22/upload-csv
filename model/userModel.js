
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({

    firstname : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required: [true, "please enter email"],
        unique: true,
    },
    city : {
        type: String,
    },
    phone :{
        type : String,
    },
    address : {
        type : String,
    },
    dob :{
        type : String
    }
})

export default  mongoose.model("user",userSchema)