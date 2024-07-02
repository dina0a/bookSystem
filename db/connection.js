import mongoose from "mongoose";

// import modules

// create DB
export const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/bookSystem").then(() => {
        console.log("db connected successfully");
    }).catch((err) => {
        console.log("Field connect to db");
    })
}