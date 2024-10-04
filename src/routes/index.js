import { Router } from "express";
import authRoute from "./auth-route.js";
import userRoute from "./user-route.js";
import categoryRoute from "./category-route.js";
import subcategoryRoute from "./sub-category-route.js";
import brandRoute from "./brand-route.js";
import colorRoute from "./color-route.js";
import productRoute from "./product-route.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const route = Router();

route.use("/user", userRoute);
route.use("/auth", authRoute);
route.get("/admin", authMiddleware, isAdmin, (req, res) => {
  return res.json({ message: "Welcome to the admin panel!" });
});

route.use("/category", categoryRoute);
route.use("/subcategory", subcategoryRoute);
route.use("/brand", brandRoute);
route.use("/color", colorRoute);
route.use("/products", productRoute);

export default route;
