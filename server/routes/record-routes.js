import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import multer from "multer";
import * as recordController from "../controllers/record-controller.js";
import express from "express";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./document_uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router
  .route("/:recordId")
  .get(recordController.findOne)
  .put(upload.single("recordFile"), recordController.edit)
  .delete(recordController.remove);

router
  .route("/:petId/records")
  .get(recordController.findAll)
  .post(upload.single("recordFile"), recordController.create);

export default router;
