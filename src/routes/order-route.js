import OrderController from "../controllers/order-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { Router } from "express";
const route = Router();

route.post("/create", authMiddleware, OrderController.create);

route.get("/", authMiddleware, OrderController.getAll);
export default route;
