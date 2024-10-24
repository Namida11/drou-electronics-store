import SubCategoryDto from "../../dtos/sub-category-dto.js";
import { SubCategoryRepository } from "../../repositories/category/sub-category-repository.js";
import APIError from "../../utils/response/error.js";
import referencesValidation from "../../validation/references/references-validation.js";

const subCategoryRepo = new SubCategoryRepository();

const SubCategoryService = {
  create: async function (subCtg) {
    console.log("first");
    const existingSubCategory = await subCategoryRepo.findByUniqueFields({
      name: subCtg.name,
      parentCategory: subCtg.parentCategory,
    });

    if (existingSubCategory && existingSubCategory.isDeleted) {
      existingSubCategory.isDeleted = false;
      const updatedSubCategory = await subCategoryRepo.update(
        existingSubCategory._id,
        existingSubCategory
      );
      return new SubCategoryDto(updatedSubCategory);
    }

    if (existingSubCategory && !existingSubCategory.isDeleted) {
      throw new APIError("This sub-category already exists!");
    }
    await referencesValidation.validateReference(
      referencesValidation.categoryRepo,
      subCtg.parentCategoryID,
      "Category"
    );
    const newSubCategory = await subCategoryRepo.create(subCtg);
    return new SubCategoryDto(newSubCategory);
  },

  getAll: async function () {
    const { result } = await subCategoryRepo.findAll();

    if (result.length === 0) {
      throw new APIError("No sub-categories found!");
    }

    const activeSubCategories = result.filter(
      (subCategory) => !subCategory.isDeleted
    );

    return activeSubCategories.map(
      (subCategory) => new SubCategoryDto(subCategory)
    );
  },

  getById: async function (subCategoryId) {
    const subCategory = await subCategoryRepo.findByID(subCategoryId);

    if (!subCategory) {
      throw new APIError("Sub-category not found!");
    }

    return new SubCategoryDto(subCategory);
  },

  update: async function (subCategoryId, subCategoryData) {
    const subCategory = await subCategoryRepo.findByID(subCategoryId);
    console.log(subCategory, "subctg");

    if (!subCategory) {
      throw new APIError("Sub-category not found!");
    }

    await referencesValidation.validateReference(
      referencesValidation.categoryRepo,
      subCategoryData.parentCategoryID || subCategory.parentCategoryID,
      "Category"
    );

    const updatedData = {
      ...subCategoryData,
    };

    console.log(subCategoryData, "updtsub");

    const updatedSubCategory = await subCategoryRepo.update(
      subCategoryId,
      updatedData
    );

    return new SubCategoryDto(updatedSubCategory);
  },

  delete: async function (subCategoryId) {
    const subCategory = await subCategoryRepo.findByID(subCategoryId);

    if (!subCategory) {
      throw new APIError("Sub-category not found!");
    }

    subCategory.isDeleted = true;
    const deletedSubCategory = await subCategoryRepo.update(
      subCategoryId,
      subCategory
    );

    return new SubCategoryDto(deletedSubCategory);
  },

  deleteAll: async function () {
    const subCategories = await subCategoryRepo.findByFields({
      isDeleted: false,
    });

    if (subCategories.length === 0) {
      throw new APIError("No sub-categories found!");
    }

    const deletedSubCategories = [];
    for (let subCategory of subCategories) {
      subCategory.isDeleted = true;

      const deletedSubCategory = await subCategoryRepo.update(
        subCategory._id,
        subCategory
      );
      deletedSubCategories.push(new SubCategoryDto(deletedSubCategory));
    }

    return deletedSubCategories;
  },
};

export default SubCategoryService;
