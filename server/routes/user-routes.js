import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import * as userController from "../controllers/user-controller.js";
import express from "express";
const router = express.Router();

router
  .route("/:id")
  .get(userController.findOne)
  .put(userController.edit)
  .delete(userController.remove);

router.route("/").get(userController.findAll).post(userController.create);

export default router;
