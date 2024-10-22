import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import multer from "multer";
import * as petController from "../controllers/pet-controller.js";
import express from "express";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route("/:id")
  .get(petController.findOne)
  .put(upload.single("petImage"), petController.edit)
  .delete(petController.remove);

router
  .route("/")
  .get(petController.findAll)
  .post(upload.single("petImage"), petController.create);

export default router;
