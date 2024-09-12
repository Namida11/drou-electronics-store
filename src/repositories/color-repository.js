import { BaseRepository } from "./base-repository.js";
import Color from "../models/color-model.js";

export class ColorRepository extends BaseRepository {
  constructor() {
    super(Color);
  }
}
