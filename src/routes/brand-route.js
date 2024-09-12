import { Router } from "express";
import BrandController from "../controllers/brand-controller.js";
// import validate from "../middlewares/validate.js";
// import { registerSchema } from "../validation/user-validation/auth-schema-validation.js";
const route = Router();

route.post("/create", BrandController.create);
route.get("/", BrandController.getAll);

route.patch("/update/:id", BrandController.update);
route.delete("/delete/:id", BrandController.delete);
route.delete("/delete", BrandController.deleteAll);

export default route;
