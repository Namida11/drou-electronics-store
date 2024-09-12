import Joi from "joi";
import {
  baseEmailField,
  basePasswordField,
  baseNameField,
} from "./base-schema-validation.js";

const registerSchema = Joi.object({
  firstName: baseNameField,
  lastName: baseNameField,
  email: baseEmailField,
  password: basePasswordField,
  role: Joi.string()
    .valid("user", "admin")
    .optional() // opsiyonel yapıyoruz, gönderilmezse sorun yaratmayacak
    .messages({
      "string.valid": "Role must be either 'user' or 'admin'",
    }),
});

const loginSchema = Joi.object({
  email: baseEmailField,
  password: basePasswordField,
});

export { registerSchema, loginSchema };
