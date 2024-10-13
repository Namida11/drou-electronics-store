import { BrandRepository } from "../../repositories/brand-repository.js";
import { ColorRepository } from "../../repositories/color-repository.js";
import { CategoryRepository } from "../../repositories/category/category-repository.js";
import { SubCategoryRepository } from "../../repositories/category/sub-category-repository.js";

class ValidateReferences {
  constructor() {
    this.brandRepo = new BrandRepository();
    this.colorRepo = new ColorRepository();
    this.categoryRepo = new CategoryRepository();
    this.subCategoryRepo = new SubCategoryRepository();
  }

  async validateReference(repo, id, fieldName) {
    const entity = await repo.findByID(id);
    if (!entity) {
      throw new Error(`${fieldName} does not exist!`);
    }
  }

  async validateAllReferences(data) {
    const { brand, color, category, subcategory } = data;

    if (brand) {
      await this.validateReference(this.brandRepo, brand, "Brand");
    }
    if (color) {
      await this.validateReference(this.colorRepo, color, "Color");
    }
    if (category) {
      await this.validateReference(this.categoryRepo, category, "Category");
    }
    if (subcategory) {
      await this.validateReference(
        this.subCategoryRepo,
        subcategory,
        "SubCategory"
      );
    }
  }
}

export default new ValidateReferences();
