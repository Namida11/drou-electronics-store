import { Router } from "express";
import ProductController from "../controllers/product-controller.js";

import upload from "../middlewares/multer.js";

const route = Router();

route.post(
  "/create",
  upload("products").array("images", 5),
  ProductController.create
);

route.get("/", ProductController.getAll);

route.patch("/update/:id", ProductController.update);

route.delete("/delete/:id", ProductController.delete);

route.delete("/delete", ProductController.deleteAll);

export default route;
