 
import mongoose from 'mongoose';

const connectDatabase = ()=>{
    mongoose.connect("mongodb://localhost:27017/admin",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data)=>{
        console.log(`mongodb connection success: ${data.connection.host}`)
    }).catch((err)=>{ 
        console.log(err);
    })
}

export default connectDatabase;