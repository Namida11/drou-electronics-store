import ProductService from "../services/product-service.js";
import { ErrorResponse, SuccessResponse } from "../utils/response/response.js";

const ProductController = {
  create: async function (req, res, next) {
    try {
      console.log("salammmm");
      console.log(req.body);
      console.log(req.files, "files");
      const product = await ProductService.create(req.body, req.files);

      console.log(product);
      if (!product)
        return res.json(new ErrorResponse(404, "Product not found!"));

      return res.json(
        new SuccessResponse(201, "Product created successfully!", product)
      );
    } catch (error) {
      next(error);
    }
  },

  getAll: async function (req, res, next) {
    try {
      const products = await ProductService.getAll();
      return res.json(
        new SuccessResponse(200, "Products retrieved successfully", products)
      );
    } catch (error) {
      next(error);
    }
  },

  update: async function (req, res, next) {
    try {
      const { id } = req.params;
      console.log(req, "fgfg");
      const productData = req.body;

      const updatedProduct = await ProductService.update(id, productData);

      res.json(
        new SuccessResponse(200, "Product updated successfully", updatedProduct)
      );
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductService.delete(id);

      res.json(
        new SuccessResponse(200, "Product deleted successfully", deletedProduct)
      );
    } catch (error) {
      next(error);
    }
  },

  deleteAll: async function (req, res, next) {
    try {
      const deletedProducts = await ProductService.deleteAll();

      res.json(
        new SuccessResponse(
          200,
          "All products deleted successfully",
          deletedProducts
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
