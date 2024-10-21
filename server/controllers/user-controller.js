import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// Validation Functions
const validateUserData = (data) => {
  const { firstName, lastName, type, username, password, email } = data;
  if (!firstName || !lastName || !type || !username || !password || !email) {
    return { valid: false, message: `All fields are required` };
  }

  return { valid: true };
};

const validateEmail = (email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email);
  return isValid
    ? { valid: true }
    : { valid: false, message: `Invalid email format` };
};

const findOne = async (req, res) => {
  try {
    const userData = await knex("users").where({ id: req.params.id }).first();

    if (!userData) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    return res.json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to retrieve user data for user with ID ${req.params.id}`,
    });
  }
};

const findAll = async (req, res) => {
  try {
    const userData = await knex("users");
    return res.json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to retrieve user data`,
    });
  }
};

const create = async (req, res) => {
  const validation = validateUserData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const { email } = req.body;
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ message: emailValidation.message });
  }

  const { firstName, lastName, type, username, password } = req.body;

  try {
    const [userData] = await knex("users")
      .insert({
        first_name: firstName,
        last_name: lastName,
        type,
        username,
        password_hash: password, // placeholder
        email,
      })
      .returning("*");

    const {
      id,
      first_name,
      last_name,
      type,
      username: userUsername,
    } = userData;
    return res
      .status(201)
      .json({ id, first_name, last_name, type, userUsername, email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to create user`,
    });
  }
};

const edit = async (req, res) => {
  const validation = validateUserData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const { email } = req.body;
  const emailValidation = validateEmail(email);
  if (email && !emailValidation.valid) {
    return res.status(400).json({ message: emailValidation.message });
  }

  const { firstName, lastName, type, username, password } = req.body;

  try {
    const updatedData = await knex("users")
      .where({ id: req.params.id })
      .update({
        first_name: firstName,
        last_name: lastName,
        type,
        username,
        password_hash: password, // placeholder
        email,
      });

    if (updatedData === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("users")
      .where({ id: req.params.id })
      .delete();

    await knex("pets").where("user_id", req.params.id).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to delete user`,
    });
  }
};

export { findOne, findAll, remove, create, edit };
