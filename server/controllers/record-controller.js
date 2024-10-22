import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// validation functions
const validateRecordData = (data) => {
  const { recordFile } = data;
  if (!recordFile) {
    return { valid: false, message: `File is required` };
  }

  return { valid: true };
};

const findOne = async (req, res) => {
  try {
    const recordData = await knex("pet_record_tracker")
      .where({ id: req.params.id })
      .first();

    if (!recordData) {
      return res.status(404).json({
        message: `record with ID ${req.params.id} not found`,
      });
    }

    return res.json(recordData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to retrieve record data for record with ID ${req.params.id}`,
    });
  }
};

const findAll = async (req, res) => {
  try {
    const recordData = await knex("pet_record_tracker");
    return res.json(recordData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to retrieve record data`,
    });
  }
};

const create = async (req, res) => {
  const validation = validateRecordData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const { apptDate, recordFile, petId } = req.body;

  const petExists = await knex("pets").where({ id: petId }).first();
  if (!petExists) {
    return res.status(400).json({ message: "Pet ID is invalid" });
  }

  try {
    const result = await knex("pet_record_tracker").insert({
      appt_date: apptDate,
      record_file: recordFile,
      pet_id: petId,
    });

    const recordData = await knex("pet_record_tracker")
      .where({ id: result[0] })
      .first();
    return res.status(201).json({
      recordData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to create record`,
    });
  }
};

const edit = async (req, res) => {
  const validation = validateRecordData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const { apptDate, recordFile, petId } = req.body;

  try {
    const currentRecord = await knex("pet_record_tracker")
      .where({ id: req.params.id })
      .first();
    if (!currentRecord) {
      return res
        .status(404)
        .json({ message: `Record with ID ${req.params.id} not found` });
    }

    const updatedData = await knex("pet_record_tracker")
      .where({ id: req.params.id })
      .update({
        appt_date: apptDate,
        record_file: recordFile,
        pet_id: petId,
      });

    if (updatedData === 0) {
      return res.status(404).json({
        message: `Record with ID ${req.params.id} not found`,
      });
    }

    return res.status(200).json({ message: "Record updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating record" });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("pet_record_tracker")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Record with ID ${req.params.id} not found`,
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Unable to delete record`,
    });
  }
};

export { findOne, findAll, remove, create, edit };
