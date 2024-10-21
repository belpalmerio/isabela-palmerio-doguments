export function up(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.enu('type', ['client', 'vet']).notNullable();
      table.string('username').notNullable().unique();
      table.string('password_hash').notNullable();
      table.string('email').notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); 
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('users');
  }
  