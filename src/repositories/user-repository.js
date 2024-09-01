import { BaseRepository } from "./base-repository.js";
import User from "../models/user-model.js";

export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}
