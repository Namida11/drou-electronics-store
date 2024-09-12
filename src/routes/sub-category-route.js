import { Router } from "express";
import SubCategoryController from "../controllers/category/sub-category-controller.js";
// import validate from "../middlewares/validate.js";
// import { registerSchema } from "../validation/user-validation/auth-schema-validation.js";
const route = Router();

route.post("/create", SubCategoryController.create);
route.get("/", SubCategoryController.getAll);

route.patch("/update/:id", SubCategoryController.update);
route.delete("/delete/:id", SubCategoryController.delete);
route.delete("/delete", SubCategoryController.deleteAll);

export default route;
