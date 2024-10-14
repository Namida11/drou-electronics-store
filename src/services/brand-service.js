import BrandDto from "../dtos/brand-dto.js";
import { BrandRepository } from "../repositories/brand-repository.js";
import APIError from "../utils/response/error.js";

const brandRepo = new BrandRepository();

const BrandService = {
  create: async function (brandData) {
    const existingBrand = await brandRepo.findByUniqueFields({
      name: brandData.name,
    });

    if (existingBrand && existingBrand.isDeleted) {
      existingBrand.isDeleted = false;
      const updatedBrand = await brandRepo.update(
        existingBrand._id,
        existingBrand
      );
      return new BrandDto(updatedBrand);
    }

    if (existingBrand && !existingBrand.isDeleted) {
      throw new APIError("This brand already exists!");
    }

    const newBrand = await brandRepo.create(brandData);
    return new BrandDto(newBrand);
  },

  getAll: async function () {
    const { result } = await brandRepo.findAll();
    if (result.length === 0) {
      throw new APIError("No brands found!");
    }

    const activeBrands = result.filter((brand) => !brand.isDeleted);
    return activeBrands.map((brand) => new BrandDto(brand));
  },
  getOne: async function (id) {
    const data = await brandRepo.findByID(id);

    return new BrandDto(data);
  },
  update: async function (brandId, brandData) {
    const brand = await brandRepo.findByID(brandId);
    if (!brand) {
      throw new APIError("Brand not found!");
    }

    const updateData = {
      ...brandData,
    };
    const updatedBrand = await brandRepo.update(brandId, updateData);
    return new BrandDto(updatedBrand);
  },

  delete: async function (brandId) {
    const brand = await brandRepo.findByID(brandId);
    if (!brand) {
      throw new APIError("Brand not found!");
    }

    brand.isDeleted = true;
    const deletedBrand = await brandRepo.update(brandId, brand);
    return new BrandDto(deletedBrand);
  },

  deleteAll: async function () {
    const brands = await brandRepo.findByFields({ isDeleted: false });
    if (brands.length === 0) {
      throw new APIError("No brands found!");
    }

    const deletedBrands = [];
    for (let brand of brands) {
      brand.isDeleted = true;
      const deletedBrand = await brandRepo.update(brand._id, brand);
      deletedBrands.push(new BrandDto(deletedBrand));
    }

    return deletedBrands;
  },
};

export default BrandService;
