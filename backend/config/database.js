import mongoose from 'mongoose'

const connectDB= 
    mongoose.connect("mongodb://127.0.0.1:27017/admin")
.then(()=> console.log("MongoDB connected"))
.catch((err)=> console.log("Mongo Error", err));


export default connectDB