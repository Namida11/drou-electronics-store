import { BaseRepository } from "../base-repository.js";
import SubCategory from "../../models/subcategory-model.js";

export class SubCategoryRepository extends BaseRepository {
  constructor() {
    super(SubCategory);
  }
}
