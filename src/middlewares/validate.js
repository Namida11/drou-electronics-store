import { ErrorResponse } from "../utils/response/response.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);

      return res.json(new ErrorResponse(400, errors));
    }
    next();
  };
};

export default validate;
