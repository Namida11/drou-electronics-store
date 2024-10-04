import ColorDto from "../dtos/color-dto.js";
import { ColorRepository } from "../repositories/color-repository.js";
import APIError from "../utils/response/error.js";

const colorRepo = new ColorRepository();

const ColorService = {
  create: async function (colorData) {
    const existingColor = await colorRepo.findByUniqueFields({
      name: colorData.name,
    });

    if (existingColor && existingColor.isDeleted) {
      existingColor.isDeleted = false;
      const updatedColor = await colorRepo.update(
        existingColor._id,
        existingColor
      );
      return new ColorDto(updatedColor);
    }

    if (existingColor && !existingColor.isDeleted) {
      throw new APIError("This color already exists!");
    }

    const newColor = await colorRepo.create(colorData);
    return new ColorDto(newColor);
  },

  getAll: async function () {
    const { result } = await colorRepo.findAll();
    if (result.length === 0) {
      throw new APIError("No colors found!");
    }

    const activeColors = result.filter((color) => !color.isDeleted);
    return activeColors.map((color) => new ColorDto(color));
  },

  update: async function (colorId, colorData) {
    const color = await colorRepo.findByID(colorId);
    if (!color) {
      throw new APIError("Color not found!");
    }

    color.name = colorData.name || color.name;
    color.hex = colorData.hex || color.hex;
    color.isDeleted = colorData.isDeleted ?? color.isDeleted;

    const updatedColor = await colorRepo.update(colorId, color);
    return new ColorDto(updatedColor);
  },

  delete: async function (colorId) {
    const color = await colorRepo.findByID(colorId);
    if (!color) {
      throw new APIError("Color not found!");
    }

    color.isDeleted = true;
    const deletedColor = await colorRepo.update(colorId, color);
    return new ColorDto(deletedColor);
  },

  deleteAll: async function () {
    const colors = await colorRepo.findByFields({ isDeleted: false });
    if (colors.length === 0) {
      throw new APIError("No colors found!");
    }

    const deletedColors = [];
    for (let color of colors) {
      color.isDeleted = true;
      const deletedColor = await colorRepo.update(color._id, color);
      deletedColors.push(new ColorDto(deletedColor));
    }

    return deletedColors;
  },
};

export default ColorService;
