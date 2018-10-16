// CLUCKS

const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const cookieParser = require("cookie-parser");



router.use((request, response, next) => {

    const username = request.cookies.username;
    response.locals.username = "";
    const profile_pic = request.cookies.profile_pic;
    response.locals.profile_pic = "";

    if (username) {
        response.locals.username = username;
        console.log(`ð Signed in as ${username}`);
    }

    if (profile_pic) {
        response.locals.profile_pic = profile_pic;
        console.log(`ð Profile Pic is ${profile_pic}`);
    }

    next();
});
router.use(cookieParser());


router.get("/clucks/new", (req, res) => {
    // load ejs file cohorts/new.ejs

    name = req.cookies.username;
    console.log("this is request.query.name", req.cookies.username);

    profile_pic = req.cookies.profile_pic;
    console.log("this is request.query.name", req.cookies.profile_pic);
    res.render("clucks/new");
});


router.post("/newCluck", (req, res) => {
    knex("clucks")
        .insert({

            username: req.cookies.username,
            profile_pic: req.cookies.profile_pic,
            image_url: req.body.image_url,
            content: req.body.content,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt


        })
        .returning("*")
        .then(clucks => {
            res.redirect("/clucks");

        });
});


// posts#index URL: /posts METHOD: GET
router.get("/clucks", (req, res) => {

    let doubleArray = [[]];
    let howLongAgo = 0;
    //    console.log("content from clucks is ", req.body.content);
   
   // long function to get occurence of hashtags and trending topics
    knex
        .select("*")
        .from("clucks")
        .where("content", "ilike", "%#%")
        .then(data => {
            console.log("This is the rturned data", data);

            // console.log("This is the rturned data", data[0].content);

            let words = [];
            let allHashtags = [];
            let hashtagObject = {};
            
            for (let datum of data) {

                //let postHashtags = [];

                let quantity = 0;
                words = datum.content.split(" ")
                //console.log ("this is the datum", words);

                for (let word of words) {

                    if (word[0] === "#") {
                        //  console.log("these are the hashtags ... ", word); 
                        word = word.replace(/,/g, "");
                        hashtagObject.word = word;
                        console.log("word object is ", hashtagObject.word);

                        allHashtags.push(hashtagObject.word)

                        // console.log("all hashtag array is ",  allHashtags);
                    }
                    // console.log("these are the post hashtags ", postHashtagshah) 

                    //console.log("all hashtag array is ",  allHashtags);
                    

                    function duplicates(arr) {
                        let array1 = [], array2 = [], prev;

                        arr.sort();
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] !== prev) {
                                array1.push(arr[i]);
                                array2.push(1);
                            } else {
                                array2[array2.length - 1]++;
                            }
                            prev = arr[i];
                        }

                        return ([array1, array2]);
                    }
                    
                   

                }
                // doubleArray = duplicates(allHashtags);
                // console.log(doubleArray);
               
            }

            doubleArray = duplicates(allHashtags);
            console.log(doubleArray);

          
            knex("clucks")
            .orderBy("createdAt", "desc")
            .then(clucks => {
                res.render("clucks/index", { clucks: clucks, doubleArray,  });
            });

        });


    //  hashtag.name = name; 
    // hashtag.quantity = quantity;
    // allHashtags.push({hashtag:hashtag});



  
});

module.exports = router;




