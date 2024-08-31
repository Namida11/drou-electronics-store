import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    hex: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", colorSchema);

export default Color;
