import { BaseRepository } from "./base-repository.js";
import Order from "../models/order-model.js";

export class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }
}
