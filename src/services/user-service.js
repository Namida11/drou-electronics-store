import { UserRepository } from "../repositories/user-repository.js";
import APIErrors from "../utils/response/error.js";
import hashPassword from "../utils/auth/hash-password.js";

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

    return createdUser;
  },
  getAllUsers: async function (page, limit) {
    const allData = await userRepo.findAll(page, limit);

    return allData;
  },
};

export default UserService;
