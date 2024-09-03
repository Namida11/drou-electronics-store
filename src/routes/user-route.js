import { UserController } from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

import { Router } from "express";

const route = Router();
route.get("/getAll", authMiddleware, UserController.getAllUsers);
// route.post("/create", UserController.create);

export default route;
