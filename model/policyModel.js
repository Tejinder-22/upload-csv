import mongoose from 'mongoose';
 
const policySchema = new mongoose.Schema({

    agent_name : {
        type: String,
        unique: false
    },
    policy_number : {
        type: String,
        unique: true,
        required: true,
    },
    policy_mode : {
        type: Number,
    },
    policy_type : {
        type : String,
    },
    policy_start_date : {
        type : Date
    },
    policy_end_date : {
        type : Date
    }
})
export default mongoose.model("policy",policySchema)