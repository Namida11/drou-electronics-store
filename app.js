import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import "./src/config/db-connect.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("server is running PORT:", PORT);
});
