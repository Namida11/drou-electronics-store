import { BaseRepository } from "./base-repository.js";
import Brand from "../models/brand-model.js";

export class BrandRepository extends BaseRepository {
  constructor() {
    super(Brand);
  }
}
