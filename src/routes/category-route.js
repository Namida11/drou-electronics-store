import { Router } from "express";
import CategoryController from "../controllers/category/category-controller.js";
// import validate from "../middlewares/validate.js";
// import { registerSchema } from "../validation/user-validation/auth-schema-validation.js";
const route = Router();

route.post("/create", CategoryController.create);
route.get("/", CategoryController.getAll);

route.patch("/update/:id", CategoryController.update);
route.delete("/delete/:id", CategoryController.delete);
route.delete("/delete", CategoryController.deleteAll);

export default route;
