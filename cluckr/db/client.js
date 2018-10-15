const knexfile = require("../knexfile");

//allows us to use KNEX to make queries
const knex = require("knex")(knexfile["development"]);

//allow us to use KNEX without having to run the configuration everytime
module.exports = knex;

