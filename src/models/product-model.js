import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
    description: { type: String },
    images: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
