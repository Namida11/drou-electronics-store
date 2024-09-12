import { UserRepository } from "../repositories/user-repository.js";
import APIErrors from "../utils/response/error.js";
import hashPassword from "../utils/auth/hash-password.js";
import UserDto from "../dtos/user-dto.js";

const userRepo = new UserRepository();

const UserService = {
  create: async function (userDto) {
    const findData = await userRepo.findByUniqueFields({
      email: userDto.email,
    });

    if (findData) {
      throw new APIErrors("User already exists!", 401);
    }

    const hashedPassword = await hashPassword(userDto.password);
    const newUser = {
      ...userDto,
      password: hashedPassword,
    };

    const createdUser = await userRepo.create(newUser);
    const result = new UserDto(createdUser);
    return result;
  },
  getAllUsers: async function (page, limit) {
    try {
      const { result, totalData } = await userRepo.findAll(page, limit);

      const allUserDtos = result.map((data) => new UserDto(data.toObject()));

      return {
        users: allUserDtos,
        totalData: totalData,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default UserService;
