import mongoose from "mongoose";
import Category from "./category-model.js";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    parentCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
