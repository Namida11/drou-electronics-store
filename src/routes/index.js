import { Router } from "express";
import authRoute from "./auth-route.js";
import userRoute from "./user-route.js";
const route = Router();

route.use("/user", userRoute);
route.use("/auth", authRoute);

export default route;
