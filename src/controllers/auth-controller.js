import UserDto from "../dtos/user-dto.js";
import AuthService from "../services/auth-service.js";
import APIErrors from "../utils/response/error.js";
import { ErrorResponse, SuccessResponse } from "../utils/response/response.js";

export const AuthController = {
  login: async function (req, res) {
    const loginDto = req.body;

    const result = await AuthService.login(loginDto);

    console.log(result, "result");

    return res.json(
      new SuccessResponse(200, "user login successfully", result)
    );
  },
  register: async function (req, res) {
    const userDto = req.body;

    const user = await AuthService.register(userDto);

    return res.json(
      new SuccessResponse(200, "User registered successfully", user)
    );
  },
};
