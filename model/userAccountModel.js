
import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema({

    firstname : {
        type: String,
        required : true,
    },
    account_name : {
        type: String,   
        unique: true,
        required : true,
    },
    account_type : {
        type: String,
    },
    phone : {
        type: String
    },
    agent_id :{
        type: mongoose.Schema.ObjectId,
        ref: "agent",
    },
    policy_id : {
        type: mongoose.Schema.ObjectId,
        ref: "policy"
    }
})

export default  mongoose.model("user_account",userSchema)