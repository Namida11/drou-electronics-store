import BrandService from "../services/brand-service.js";
import { ErrorResponse, SuccessResponse } from "../utils/response/response.js";

const BrandController = {
  create: async function (req, res, next) {
    try {
      const brand = await BrandService.create(req.body);
      if (!brand) return res.json(new ErrorResponse(404, "Brand not found!"));

      return res.json(
        new SuccessResponse(201, "Brand created successfully!", brand)
      );
    } catch (error) {
      next(error);
    }
  },

  getAll: async function (req, res, next) {
    try {
      const brands = await BrandService.getAll();
      return res.json(
        new SuccessResponse(200, "Brands retrieved successfully", brands)
      );
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const brandData = req.body;
      const updatedBrand = await BrandService.update(id, brandData);

      res.json(
        new SuccessResponse(200, "Brand updated successfully", updatedBrand)
      );
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBrand = await BrandService.delete(id);

      res.json(
        new SuccessResponse(200, "Brand deleted successfully", deletedBrand)
      );
    } catch (error) {
      next(error);
    }
  },

  deleteAll: async (req, res, next) => {
    try {
      const deletedBrands = await BrandService.deleteAll();

      res.json(
        new SuccessResponse(
          200,
          "All brands deleted successfully",
          deletedBrands
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default BrandController;
