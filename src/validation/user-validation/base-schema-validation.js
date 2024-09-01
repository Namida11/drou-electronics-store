import Joi from "joi";

const baseEmailField = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.email": `Email must be a valid email`,
    "any.required": `Email is a required field`,
  });

const basePasswordField = Joi.string()
  .min(6)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
  .required()
  .messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, and one number`,
    "string.min": `Password should have a minimum length of {#limit}`,
    "string.max": `Password should have a maximum length of {#limit}`,
    "any.required": `Password is a required field`,
  });

const baseNameField = Joi.string().min(3).max(30).required().messages({
  "string.base": `Name should be a type of 'text'`,
  "string.empty": `Name cannot be an empty field`,
  "string.min": `Name should have a minimum length of {#limit}`,
  "string.max": `Name should have a maximum length of {#limit}`,
  "any.required": `Name is a required field`,
});

export { baseEmailField, basePasswordField, baseNameField };
