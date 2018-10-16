exports.up = function(knex, Promise) {
    return knex.schema.createTable("trending", table => {
    //CREATE TABLE "countries" (   ==== > start adding my columns
        table.increments("id"); // "id" SERIAL ... in sql
        table.string("hashtag"); // "title" VARCHAR(255) ... in sql
        table.integer("count"); // "viewCount" INTEGER 
        table.timestamp("createdAt").defaultTo(knex.fn.now());
    }) };


    // exports down is like a roll back
    exports.down = function(knex, Promise) {
      return knex.schema.dropTable("trending");
    };
 