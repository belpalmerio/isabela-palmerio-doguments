import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import * as petController from "../controllers/pet-controller.js";
import express from "express";
const router = express.Router();

router
  .route("/:id")
  .get(petController.findOne)
  .put(petController.edit)
  .delete(petController.remove);

router.route("/").get(petController.findAll).post(petController.create);

export default router;
