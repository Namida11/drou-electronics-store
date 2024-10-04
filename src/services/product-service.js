import cloudinary from "../config/cloudinary.js";
import { ProductRepository } from "../repositories/product-repository.js";
import ProductDto from "../dtos/product-dto.js";
import APIError from "../utils/response/error.js";
import { getFolderName } from "../utils/get-folder-name.js";

const productRepo = new ProductRepository();

const ProductService = {
  // create: async function (productData) {
  //   const existingProduct = await productRepo.findByUniqueFields({
  //     name: productData.name,
  //     category: productData.category,
  //     brand: productData.brand,
  //   });

  //   if (existingProduct) {
  //     throw new APIError("This product already exists!");
  //   }
  //   console.log(productData);

  //   const imageUploadPromises = (productData.images || []).map(
  //     async (image) => {
  //       const result = await cloudinary.uploader.upload(image.path, {
  //         folder: "products",
  //       });
  //       return result.secure_url;
  //     }
  //   );
  //   const imageUrls = await Promise.all(imageUploadPromises);

  //   // Yeni ürün oluşturma
  //   const newProduct = await productRepo.create({
  //     ...productData,
  //     images: imageUrls,
  //   });

  //   return new ProductDto(newProduct);
  // },

  create: async (productData, files) => {
    const existingProduct = await productRepo.findByUniqueFields({
      name: productData.name,
    });

    if (existingProduct && existingProduct.isDeleted) {
      existingProduct.isDeleted = false;
      const updatedProduct = await productRepo.update(
        existingProduct._id,
        existingProduct
      );
      return new ProductDto(updatedProduct);
    }
    if (existingProduct && !existingProduct.isDeleted) {
      throw new APIError("This product already exists!");
    }
    const imageUrls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: getFolderName("products"),
      });
      imageUrls.push(result.secure_url);
    }

    const newProduct = await productRepo.create({
      ...productData,
      images: imageUrls,
    });
    return new ProductDto(newProduct);
  },

  getAll: async function () {
    const { result } = await productRepo.findAll();
    if (result.length === 0) {
      throw new APIError("No products found!");
    }

    const activeProducts = result.filter((product) => !product.isDeleted);
    return activeProducts.map((product) => new ProductDto(product));
  },

  update: async function (productId, productData, files) {
    const product = await productRepo.findByID(productId);
    if (!product) {
      throw new APIError("Product not found!");
    }
    console.log(productData, "prdcdataa");
    
    let imageUrls = product.images;
    if (files && files.length > 0) {
      imageUrls = [];

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: getFolderName("products"),
        });
        imageUrls.push(result.secure_url);
      }
    }

    const updatedProduct = await productRepo.update(productId, {
      ...productData,
      images: imageUrls,
    });

    return new ProductDto(updatedProduct);
  },

  delete: async function (productId) {
    const product = await productRepo.findByID(productId);
    if (!product || product.isDeleted) {
      throw new APIError("Product not found!");
    }

    product.isDeleted = true;
    const deletedProduct = await productRepo.update(productId, product);

    return new ProductDto(deletedProduct);
  },

  deleteAll: async function () {
    const products = await productRepo.findByFields({ isDeleted: false });
    if (products.length === 0) {
      throw new APIError("No products found!");
    }

    const deletedProducts = [];
    for (let product of products) {
      product.isDeleted = true;
      const deletedProduct = await productRepo.update(product._id, product);
      deletedProducts.push(new ProductDto(deletedProduct));
    }

    return deletedProducts;
  },
};

export default ProductService;
