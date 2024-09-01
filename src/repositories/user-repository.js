import { BaseRepository } from "./base-repository.js";
import User from "../models/user-model.js";

export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async findByEmail(email) {
    return await User.findOne({ email: email });
  }
}
