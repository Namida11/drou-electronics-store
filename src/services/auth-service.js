import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserService from "./user-service.js";
import APIErrors from "../utils/response/error.js";
import { createToken } from "../utils/auth/access-token.js";
import { ErrorResponse } from "../utils/response/response.js";
import { UserRepository } from "../repositories/user-repository.js";
import UserDto from "../dtos/user-dto.js";
import AuthDto from "../dtos/auth-dto.js";
import LoginDto from "../dtos/login-dto.js";
import { handleUserRedirect } from "../utils/auth/handle-user-redirect.js";

const userRepo = new UserRepository();
const AuthService = {
  register: async function (authDto) {
    const createdUser = await UserService.create(authDto);

    const payload = {
      id: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    };

    const token = createToken(payload, process.env.JWT_SECRET, "1h");

    const result = {
      user: new LoginDto(createdUser),
      token: token,
    };

    return handleUserRedirect(result);
  },

  login: async function (loginDto) {
    const userExist = await userRepo.findByUniqueFields({
      email: loginDto.email,
    });

    if (!userExist) {
      throw new APIErrors("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      userExist.password
    );

    if (!isPasswordValid) {
      throw new APIErrors("Password or email incorrect", 401);
    }

    const payload = {
      id: userExist._id,
      email: userExist.email,
      role: userExist.role,
    };

    const token = createToken(payload, process.env.JWT_SECRET, "1h");

    console.log(token);
    const user = new LoginDto(userExist);

    const result = {
      user: user,
      token: token,
    };

    return handleUserRedirect(result);
  },
};

export default AuthService;
