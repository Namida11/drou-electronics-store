import UserService from "../services/user-service.js";
import APIErrors from "../utils/response/error.js";
import { ErrorResponse, SuccessResponse } from "../utils/response/response.js";

export const UserController = {
  create: async function (req, res) {
    const data = await UserService.create(req.body);
    if (!data) {
      throw new APIErrors("No data returned");
    }
    res.json(new SuccessResponse(201, "user created successfully!", data));
  },
  getAllUsers: async function (req, res) {
    const page = parseInt(req.query.page) || null;
    const limit = parseInt(req.query.limit) || null;

    const response = await UserService.getAllUsers(page, limit);

    console.log(response, "response");
    
    return res.json(
      new SuccessResponse(200, "data return succefully", response)
    );
  },
};
