exports.up = function(knex, Promise) {
    return knex.schema.createTable("clucks", table => {
    //CREATE TABLE "countries" (   ==== > start adding my columns
        table.increments("id"); // "id" SERIAL ... in sql
        table.string("username"); // "title" VARCHAR(255) ... in sql
        table.string("image_url"); // "title" VARCHAR(255) ... in sql
        table.string("content"); // "title" VARCHAR(255) ... in sql
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    }) };


    // exports down is like a roll back
    exports.down = function(knex, Promise) {
      return knex.schema.dropTable("clucks");
    };
 