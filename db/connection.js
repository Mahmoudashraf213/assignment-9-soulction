import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Sarah")
    .then(() => {
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.log("Failed to connect to database");
      console.error(err);
    });
};
