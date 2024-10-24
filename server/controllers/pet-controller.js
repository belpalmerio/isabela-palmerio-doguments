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
    return { valid: false, message: "These fields are required" };
  }

  const weight =
    typeof currentWeight === "string"
      ? parseFloat(currentWeight)
      : currentWeight;

  if (isNaN(weight) || weight <= 0) {
    return {
      valid: false,
      message: "Current weight must be a positive number",
    };
  }

  return { valid: true, currentWeight: weight };
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
      message: "Unable to retrieve pet data",
    });
  }
};

const create = async (req, res) => {
  // temporary placeholder userId
  const tempUserId = req.params.userId || 2;
  const validation = validatePetData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const {
    name,
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

  const image = req.file;
  let imageName = null;

  if (image) {
    imageName = image.filename;
  }

  //to be used when login feature added
  //   const userExists = await knex("users").where({ id: userId }).first();
  //   if (!userExists) {
  //     return res.status(400).json({ message: "User ID is invalid" });
  //   }

  try {
    const result = await knex("pets").insert({
      name,
      image: imageName,
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
      user_id: tempUserId, //temporary userID until login feature implemented
    });

    const petData = await knex("pets").where({ id: result[0] }).first();
    return res.status(201).json({ petData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to create pet",
    });
  }
};

const edit = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const validation = validatePetData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const {
    name,
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
  let image;
  if (req.file) {
    image = req.file.buffer;
  }

  try {
    const currentPet = await knex("pets").where({ id: req.params.id }).first();
    if (!currentPet) {
      return res
        .status(404)
        .json({ message: `Pet with ID ${req.params.id} not found` });
    }

    let imageName = currentPet.image;
    if (req.file) {
      const image = req.file;
      imageName = image.filename;
    }

    const updatedData = await knex("pets").where({ id: req.params.id }).update({
      name: name,
      image: imageName,
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
      message: "Unable to delete pet",
    });
  }
};

export { findOne, findAll, remove, create, edit };
