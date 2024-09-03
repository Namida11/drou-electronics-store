import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/response/response.js";
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json(new ErrorResponse(401, "No token, authorization denied"));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.json(new ErrorResponse(401, err));
    else {
      req.user = user;
      next();
    }
  });
};

export default authMiddleware;
