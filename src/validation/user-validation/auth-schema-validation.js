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
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": `Confirm password does not match password`,
    "any.required": `Confirm password is a required field`,
  }),
});

const loginSchema = Joi.object({
  email: baseEmailField,
  password: basePasswordField,
});

export { registerSchema, loginSchema };
