import { BaseRepository } from "./base-repository.js";
import Product from "../models/product-model.js";

export class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }
}
