import ColorService from "../services/color-service.js";
import { ErrorResponse, SuccessResponse } from "../utils/response/response.js";

const ColorController = {
  create: async function (req, res, next) {
    try {
      const color = await ColorService.create(req.body);
      if (!color) return res.json(new ErrorResponse(404, "Color not found!"));

      return res.json(
        new SuccessResponse(201, "Color created successfully!", color)
      );
    } catch (error) {
      next(error);
    }
  },

  getAll: async function (req, res, next) {
    try {
      const colors = await ColorService.getAll();
      return res.json(
        new SuccessResponse(200, "Colors retrieved successfully", colors)
      );
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const colorData = req.body;
      const updatedColor = await ColorService.update(id, colorData);

      res.json(
        new SuccessResponse(200, "Color updated successfully", updatedColor)
      );
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedColor = await ColorService.delete(id);

      res.json(
        new SuccessResponse(200, "Color deleted successfully", deletedColor)
      );
    } catch (error) {
      next(error);
    }
  },

  deleteAll: async (req, res, next) => {
    try {
      const deletedColors = await ColorService.deleteAll();

      res.json(
        new SuccessResponse(
          200,
          "All colors deleted successfully",
          deletedColors
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default ColorController;
