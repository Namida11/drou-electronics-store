import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { getFolderName } from "../utils/get-folder-name.js";


const createStorage = (type) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "products",
      format: async (req, file) => "png", 
      public_id: (req, file) => file.originalname,
    },
  });
};

const upload = (type) => multer({ storage: createStorage(type) });

export default upload;
