import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const uri = process.env.MONGO_DB_URI

async function connectDB(){
    try{
        mongoose.connect(uri);
        console.log('connection ok')
    }
    catch(error){
        console.error(error)
    }
}


export default connectDB;