import { AuthController } from "../controllers/auth-controller.js";

import { Router } from "express";
// import validate from "../middlewares/validate.js";
// import { registerSchema } from "../schema-validations/user-validation-schema.js";
const route = Router();

route.post("/verify", AuthController.login);

route.post("/register", AuthController.register);

export default route;
