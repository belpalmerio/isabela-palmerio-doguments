export function up(knex) {
    return knex.schema.createTable('pets', (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .references('id').inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.binary('image').nullable();
      table.date('dob').notNullable();
      table.enu('sex', ['male', 'female']).notNullable();
      table.boolean('is_fixed').notNullable();
      table.string('type').notNullable();
      table.string('breed').nullable();
      table.string('conditions').nullable();
      table.string('food').nullable();
      table.string('meds').nullable();
      table.decimal('current_weight').notNullable();
      table.boolean('is_microchipped').notNullable();
      table.bigint('micro_number').nullable();
      
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
  };
  
  
  export function down(knex) {
    return knex.schema.dropTable('pets');
  };