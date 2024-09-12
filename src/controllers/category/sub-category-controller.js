import SubCategoryService from "../../services/category/sub-category-service.js";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../utils/response/response.js";

const SubCategoryController = {
  // Alt kategori oluşturma
  create: async function (req, res) {
    try {
      const subCtg = await SubCategoryService.create(req.body);

      return res.json(
        new SuccessResponse(201, "Sub-category created successfully!", subCtg)
      );
    } catch (error) {
      return res.json(
        new ErrorResponse(
          error.statusCode || 500,
          error.message || "An error occurred"
        )
      );
    }
  },

  getAll: async function (req, res) {
    try {
      const subCategories = await SubCategoryService.getAll();

      return res.json(
        new SuccessResponse(
          200,
          "Sub-categories retrieved successfully!",
          subCategories
        )
      );
    } catch (error) {
      return res.json(
        new ErrorResponse(
          error.statusCode || 500,
          error.message || "An error occurred"
        )
      );
    }
  },

  getById: async function (req, res) {
    try {
      const subCategoryId = req.params.id;
      const subCategory = await SubCategoryService.getById(subCategoryId);

      return res.json(
        new SuccessResponse(
          200,
          "Sub-category retrieved successfully!",
          subCategory
        )
      );
    } catch (error) {
      return res.json(
        new ErrorResponse(
          error.statusCode || 500,
          error.message || "An error occurred"
        )
      );
    }
  },

  update: async function (req, res) {
    try {
      const subCategoryId = req.params.id;

      const subCategoryData = req.body;
      console.log(subCategoryData);
      const updatedSubCategory = await SubCategoryService.update(
        subCategoryId,
        subCategoryData
      );

      return res.json(
        new SuccessResponse(
          200,
          "Sub-category updated successfully!",
          updatedSubCategory
        )
      );
    } catch (error) {
      return res.json(
        new ErrorResponse(
          error.statusCode || 500,
          error.message || "An error occurred"
        )
      );
    }
  },

  delete: async function (req, res) {
    try {
      const subCategoryId = req.params.id;
      const deletedSubCategory = await SubCategoryService.delete(subCategoryId);

      return res.json(
        new SuccessResponse(
          200,
          "Sub-category deleted successfully!",
          deletedSubCategory
        )
      );
    } catch (error) {
      return res.json(
        new ErrorResponse(
          error.statusCode || 500,
          error.message || "An error occurred"
        )
      );
    }
  },

  deleteAll: async function (req, res) {
    try {
      const deletedSubCategories = await SubCategoryService.deleteAll();

      return res.json(
        new SuccessResponse(
          200,
          "All sub-categories deleted successfully!",
          deletedSubCategories
        )
      );
    } catch (error) {
      return res.json(
        new ErrorResponse(
          error.statusCode || 500,
          error.message || "An error occurred"
        )
      );
    }
  },
};

export default SubCategoryController;
