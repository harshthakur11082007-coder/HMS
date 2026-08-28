import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose
     .connect("mongodb+srv://harshthakur11082007_db_user:p6vtLfKp6cL28BJI@cluster0.5wpwciy.mongodb.net/Aaspatal")
     .then(() => {
       console.log("MongoDB connected");
     })
     
}