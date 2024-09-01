import { UserRepository } from "../repositories/user-repository.js";
import APIErrors from "../utils/response/error.js";

const userRepo = new UserRepository();

const UserService = {
  create: async function (userDto) {
    const findData = userRepo.findByUniqueFields({ email: userDto.email });
    if (findData) {
      throw new APIErrors("user alredy exsist!", 401);
    }

    return await UserRepository.create(userDto);
  },
};

export default UserService;
