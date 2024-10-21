export function up(knex) {
    return knex.schema.createTable('pet_record_tracker', (table) => {
      table.increments('id').primary();
      table
        .integer('pet_id')
        .unsigned()
        .references('id').inTable('pets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.blob('record_file').notNullable();
      table.date('appt_date').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); 
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('pet_record_tracker');
  }
  