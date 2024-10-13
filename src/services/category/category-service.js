import CategoryDto from "../../dtos/category-dto.js";
import { CategoryRepository } from "../../repositories/category/category-repository.js";
import APIError from "../../utils/response/error.js";

const categoryRepo = new CategoryRepository();
const CategoryService = {
  create: async function (category) {
    console.log(category, "ctg");

    const existingCategory = await categoryRepo.findByUniqueFields({
      name: category.name,
    });

    if (existingCategory && existingCategory.isDeleted) {
      existingCategory.isDeleted = false;
      const updatedCategory = await categoryRepo.update(
        existingCategory._id,
        existingCategory
      );
      return new CategoryDto(updatedCategory);
    }

    if (existingCategory && !existingCategory.isDeleted) {
      throw new APIError("This category already exists!");
    }

    const newCategory = await categoryRepo.create(category);

    const result = new CategoryDto(newCategory);

    return result;
  },

  getAll: async function () {
    const { result } = await categoryRepo.findAll();

    if (result.length === 0) {
      throw new APIError("No categories found!");
    }

    const activeCategories = result.filter((category) => !category.isDeleted);

    return activeCategories.map((category) => new CategoryDto(category));
  },
  update: async function (categoryId, categoryData) {
    const category = await categoryRepo.findByID(categoryId);

    if (!category) {
      throw new APIError("Category not found!");
    }
    const updateData = {
      ...categoryData,
    };

    const updatedCategory = await categoryRepo.update(categoryId, updateData);

    return new CategoryDto(updatedCategory);
  },
  delete: async function (categoryId) {
    const category = await categoryRepo.findByID(categoryId);
    if (!category) {
      throw new APIError("Category not found!");
    }

    category.isDeleted = true;
    const deletedCategory = await categoryRepo.update(categoryId, category);

    return new CategoryDto(deletedCategory);
  },
  deleteAll: async function () {
    const categories = await categoryRepo.findByFields({ isDeleted: false });

    if (categories.length === 0) {
      throw new APIError("No categories found!");
    }

    const deletedCategories = [];
    for (let category of categories) {
      category.isDeleted = true;

      const deletedCategory = await categoryRepo.update(category._id, category);

      deletedCategories.push(new CategoryDto(deletedCategory));
    }

    return deletedCategories;
  },
};

export default CategoryService;
