import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connection successfully");
  })
  .catch((err) => {
    console.log(" connection does not db: ", err);
  });
