import { Router } from "express";
import ColorController from "../controllers/color-controller.js";
// import validate from "../middlewares/validate.js";
// import { registerSchema } from "../validation/user-validation/auth-schema-validation.js";
const route = Router();

route.post("/create", ColorController.create);
route.get("/", ColorController.getAll);

route.patch("/update/:id", ColorController.update);
route.delete("/delete/:id", ColorController.delete);
route.delete("/delete", ColorController.deleteAll);

export default route;
