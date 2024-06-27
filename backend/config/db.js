import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://p021097:8805740419@cluster0.wvu848g.mongodb.net/food-del')
    .then(()=>{
        console.log("DB Connected");
    })
}

