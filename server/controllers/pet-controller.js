import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// validation functions
const validatePetData = (data) => {
  const { name, dob, sex, isFixed, type, currentWeight, isMicrochipped } = data;
  if (
    !name ||
    !dob ||
    !sex ||
    !isFixed ||
    !type ||
    !currentWeight ||
    !isMicrochipped
  ) {
    return { valid: false, message: `These fields are required` };
  }

  if (typeof currentWeight !== "number" || currentWeight <= 0) {
    return {
      valid: false,
      message: `Current weight must be a positive number`,
    };
  }

  return { valid: true };
};

const findOne = async (req, res) => {
  try {
    const petData = await knex("pets").where({ id: req.params.id }).first();

    if (!petData) {
      return res.status(404).json({
        message: `Pet with ID ${req.params.id} not found`,
      });
    }

    return res.json(petData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to retrieve pet data for pet with ID ${req.params.id}`,
    });
  }
};

const findAll = async (req, res) => {
  try {
    const petData = await knex("pets");
    return res.json(petData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to retrieve pet data`,
    });
  }
};

const create = async (req, res) => {
  const validation = validatePetData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const {
    name,
    image,
    dob,
    sex,
    isFixed,
    type,
    breed,
    conditions,
    food,
    meds,
    currentWeight,
    isMicrochipped,
    microNumber,
    userId,
  } = req.body;

  const userExists = await knex("users").where({ id: userId }).first();
  if (!userExists) {
    return res.status(400).json({ message: "User ID is invalid" });
  }

  try {
    const result = await knex("pets").insert({
      name,
      image,
      dob,
      sex,
      is_fixed: isFixed,
      type,
      breed,
      conditions,
      food,
      meds,
      current_weight: currentWeight,
      is_microchipped: isMicrochipped,
      micro_number: microNumber,
      user_id: userId,
    });

    const petData = await knex("pets").where({ id: result[0] }).first();
    return res.status(201).json({ petData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to create pet`,
    });
  }
};

const edit = async (req, res) => {
  const validation = validatePetData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const {
    name,
    image,
    dob,
    sex,
    isFixed,
    type,
    breed,
    conditions,
    food,
    meds,
    currentWeight,
    isMicrochipped,
    microNumber,
    userId,
  } = req.body;

  try {
    const currentPet = await knex("pets").where({ id: req.params.id }).first();
    if (!currentPet) {
      return res
        .status(404)
        .json({ message: `Pet with ID ${req.params.id} not found` });
    }

    const updatedData = await knex("pets").where({ id: req.params.id }).update({
      name: name,
      image: image,
      dob: dob,
      sex: sex,
      is_fixed: isFixed,
      type: type,
      breed: breed,
      conditions: conditions,
      food: food,
      meds: meds,
      current_weight: currentWeight,
      is_microchipped: isMicrochipped,
      micro_number: microNumber,
      user_id: userId,
    });

    if (updatedData === 0) {
      return res.status(404).json({
        message: `Pet with ID ${req.params.id} not found`,
      });
    }

    return res.status(200).json({ message: "Pet updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating pet" });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("pets")
      .where({ id: req.params.id })
      .delete();

    await knex("pet_record_tracker").where("pet_id", req.params.id).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Pet with ID ${req.params.id} not found`,
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to delete pet`,
    });
  }
};

export { findOne, findAll, remove, create, edit };
