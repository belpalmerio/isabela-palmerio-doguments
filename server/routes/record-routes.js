import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import * as recordController from "../controllers/record-controller.js";
import express from "express";
const router = express.Router();

router
  .route("/:id")
  .get(recordController.findOne)
  .put(recordController.edit)
  .delete(recordController.remove);

router.route("/").get(recordController.findAll).post(recordController.create);

export default router;
