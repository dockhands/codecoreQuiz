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


  router.get("/clucks/new", (req, res) => {
    // load ejs file cohorts/new.ejs

    name = req.cookies.username;    
    console.log("this is request.query.name", req.cookies.username);

    profile_pic = req.cookies.profile_pic;    
    res.render("clucks/new");
  });


  router.post("/newCluck", (req, res) => {
    knex("clucks")
      .insert({
       
        username: req.cookies.username,
        image_url: req.body.image_url,
        content: req.body.content,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt


      })
      .returning("*")
      .then(clucks=> {
        res.redirect("/clucks");
        
      });
  });


    // posts#index URL: /posts METHOD: GET
router.get("/clucks", (req, res) => {
    knex("clucks")
      .orderBy("createdAt", "desc")
      .then(clucks=> {
        res.render("clucks/index", { clucks:clucks });
      });
  });

module.exports = router;