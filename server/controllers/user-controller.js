import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// validation functions
const validateUserData = (data) => {
  const { firstName, lastName, userType, userName, password, email } = data;
  if (
    !firstName ||
    !lastName ||
    !userType ||
    !userName ||
    !password ||
    !email
  ) {
    return { valid: false, message: `All fields are required` };
  }

  return { valid: true };
};

// check for existing email and username
const emailExists = async (email, userId = null) => {
  const query = knex("users").where({ email });
  if (userId) {
    query.andWhere("id", "!=", userId);
  }
  return await query.first();
};

// Check if username already exists
const usernameExists = async (username, userId = null) => {
  const query = knex("users").where({ username });
  if (userId) {
    query.andWhere("id", "!=", userId);
  }
  return await query.first();
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

  const { firstName, lastName, userType, userName, password } = req.body;

  try {
    if (await emailExists(email)) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (await usernameExists(userName)) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const result = await knex("users").insert({
      first_name: firstName,
      last_name: lastName,
      type: userType,
      username: userName,
      password_hash: password, // placeholder
      email,
    });

    const userData = await knex("users")
      .where({ id: result[0].insertId })
      .first();
    return res.status(201).json({
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      type: userData.type,
      username: userData.username,
      email: userData.email,
    });
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

  const { email, username } = req.body;
  const emailValidation = validateEmail(email);
  if (email && !emailValidation.valid) {
    return res.status(400).json({ message: emailValidation.message });
  }

  const { firstName, lastName, userType, userName, password } = req.body;

  try {
    const currentUser = await knex("users")
      .where({ id: req.params.id })
      .first();
    if (!currentUser) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }

    if (await emailExists(email, currentUser.id)) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (await usernameExists(username, currentUser.id)) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const updatedData = await knex("users")
      .where({ id: req.params.id })
      .update({
        first_name: firstName,
        last_name: lastName,
        type: userType,
        username: userName,
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
