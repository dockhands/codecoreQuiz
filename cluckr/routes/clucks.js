// CLUCKS

const express = require("express");
const router = express.Router();
const knex = require("../db/client");


// clucks URL: /clucks/ METHOD: GET

router.get("/clucks", (req, res) => {
    res.render("clucks/index");
  });

module.exports = router;