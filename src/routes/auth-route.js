import { AuthController } from "../controllers/auth-controller.js";

import { Router } from "express";
import validate from "../middlewares/validate.js";
import { registerSchema } from "../validation/user-validation/auth-schema-validation.js";
const route = Router();

route.post("/login", AuthController.login);

route.post("/register", validate(registerSchema), AuthController.register);

export default route;
