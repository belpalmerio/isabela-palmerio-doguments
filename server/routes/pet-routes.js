import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import multer from "multer";
import * as petController from "../controllers/pet-controller.js";
import express from "express";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./pet_uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router
  .route("/:id")
  .get(petController.findOne)
  .put(upload.single("image"), petController.edit)
  .delete(petController.remove);

router
  .route("/")
  .get(petController.findAll)
  .post(upload.single("image"), petController.create);

export default router;
