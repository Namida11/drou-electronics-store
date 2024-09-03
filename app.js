import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import "./src/config/db-connect.js";
import { api } from "./src/constants/api/api-constant.js";
import route from "./src/routes/index.js";
import errorHandlerMiddleware from "./src/middlewares/error-handler.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api, route);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log("server is running PORT:", PORT);
});
