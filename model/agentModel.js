import mongoose from 'mongoose';
 
const agentSchema = new mongoose.Schema({

    agent_name : {
        type: String,
        unique : true,
        required: true,
    },
    userType : {
        type: String,
    }
})


export default mongoose.model("agent",agentSchema)