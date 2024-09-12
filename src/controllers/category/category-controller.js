import CategoryService from "../../services/category/category-service.js";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../utils/response/response.js";

const CategoryController = {
  create: async function (req, res) {
    const category = await CategoryService.create(req.body);

    if (!category)
      return res.json(new ErrorResponse(404, "category not found!"));

    return res.json(
      new SuccessResponse(201, "category created successfully!", category)
    );
  },
  getAll: async function (req, res, next) {
    try {
      const categories = await CategoryService.getAll();
      return res.json(
        new SuccessResponse(
          200,
          "Categories retrieved successfully",
          categories
        )
      );
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const categoryData = req.body;
      const updatedCategory = await CategoryService.update(id, categoryData);

      res.json(
        new SuccessResponse(
          200,
          "Category updated successfully",
          updatedCategory
        )
      );
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await CategoryService.delete(id);

      res.json(
        new SuccessResponse(
          200,
          "Category deleted successfully",
          deletedCategory
        )
      );
    } catch (error) {
      next(error);
    }
  },

  deleteAll: async (req, res, next) => {
    try {
      const deletedCategories = await CategoryService.deleteAll();

      res.json(
        new SuccessResponse(
          200,
          "All categories deleted successfully",
          deletedCategories
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default CategoryController;
