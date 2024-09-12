import { ErrorResponse } from "../utils/response/response.js";
export function isAdmin(req, res, next) {
  const user = req.user;

  if (user.role !== "admin") {
    return res.json(new ErrorResponse(403, "Access denied. Admins only"));
  }

  next();
}
