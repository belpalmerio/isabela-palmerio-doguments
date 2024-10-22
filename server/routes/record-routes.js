import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import * as recordController from "../controllers/record-controller.js";
import express from "express";
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route("/:id")
  .get(recordController.findOne)
  .put(upload.single("recordFile"), recordController.edit)
  .delete(recordController.remove);

router
  .route("/")
  .get(recordController.findAll)
  .post(upload.single("recordFile"), recordController.create);

export default router;
