import usersData from "../seed-data/users.js";
import petsData from "../seed-data/pets.js";
import recordsData from "../seed-data/pet_records_tracker.js";

export async function seed(knex) {
  await knex("pet_record_tracker").del();
  await knex("pets").del();
  await knex("users").del();
  
  await knex("users").insert(usersData);
  await knex("pets").insert(petsData);
  await knex("pet_record_tracker").insert(recordsData);
}