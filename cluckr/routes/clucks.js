// CLUCKS

const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const cookieParser = require("cookie-parser");



router.use((request, response, next) => {

    const username = request.cookies.username;
    response.locals.username = "";
  
    if (username) {
      response.locals.username = username;
      console.log(`ð Signed in as ${username}`);
    }
    next();
  });
router.use(cookieParser());


// clucks URL: /clucks/ METHOD: GET

router.get("/clucks", (req, res) => {
    res.render("clucks/index");
  });


  router.get("/clucks/new", (req, res) => {
    // load ejs file cohorts/new.ejs

    name = req.cookies.username;    
    console.log("this is request.query.name", req.cookies.username);
    res.render("clucks/new");
  });


  router.post("/newCluck", (req, res) => {
    knex("clucks")
      .insert({
       
       // username: req.body.usernamee,
        imagel_url: req.body.image_url,
        content: req.body.content,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt


      })
      .returning("*")
      .then(clucks=> {
        res.redirect("/clucks");
        
      });
  });


module.exports = router;