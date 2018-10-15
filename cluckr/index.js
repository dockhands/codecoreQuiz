const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express();
const clucksRouter = require("./routes/clucks");

// set the View Engine
app.set("view engine", "ejs");

// access my public stylesheets
app.use(express.static(path.join(__dirname, "public")));

// access bodyparsers
app.use(bodyParser.urlencoded({ extended: true }));
// access cookies parsers
app.use(cookieParser());

//access the router
app.use("/", clucksRouter);

// cookie parser middle ware

app.use((request, response, next) => {
    // Read cookies from the request with `request.cookies`
    // Cookies are represented as an object where each key is
    // the name of the cookie and its value the content of the cookie.
    // To use `request.cookies` or `response.cookie()` you must
    // first install "cookie-parser" middleware.
    const username = request.cookies.username;
    // Properties set on `response.locals` become variables in
    // all rendered templates. This means the `username` can be used
    // as a variable inside the "welcome.ejs" or any other template.
    response.locals.username = "";
  
    if (username) {
      response.locals.username = username;
      console.log(`ð Signed in as ${username}`);
    }
  
    next();
  });


app.get('/hello-world', function (req, res) {
    res.send('Hello, World!');
  });

  app.get('/', function (req, res) {
 
   const name = req.cookies.username;    
   console.log("this is request.query.name", req.cookies.username);

    // this will render a file called: welcome.ejs (because ejs is our default view engine)
    // within a folder called `views` (by convention)
   res.render("home", { visitorName: name });

  });


app.get('/login', function (req, res) {
    res.render("login");
  });




  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 5;
  app.post("/login", (request, response) => {
    
    //response.send('Hello, World!');
  
    const username = request.body.username;
  
    // `response.cookie(<cookie-name>, <cookie-value>, <options>)`
    // The above method is added to the `response` object by the
    // cookie parser middleware. Use to send cookies to the browser.
    // - The first arg. is a string that's the name of the cookie
    // - The second arg. is a value for the cookie which can be
    //   an object or an array.
    // - (optional) The last, options for the cookie.
  
    response.cookie("username", username, { maxAge: COOKIE_MAX_AGE });
  
    // Like `response.send` and `response.render`, `response.redirect` ends
    // the response. It tells browser to make GET request to a specified
    // location forcing the user to go to a new URL.
    response.redirect("/");
  });


const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});