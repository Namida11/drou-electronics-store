import { BaseRepository } from "../base-repository.js";
import Category from "../../models/category-model.js";

export class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }
}
