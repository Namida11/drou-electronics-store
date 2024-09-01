import APIErrors from "../utils/response/error.js";
import { ErrorResponse } from "../utils/response/response.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIErrors) {
    return res.json(new ErrorResponse(err.statusCode || 400, err.message));
  }
  next();
  return res.json(
    new ErrorResponse(500, "We encountered an error please check the APIs")
  );
};

export default errorHandlerMiddleware;
