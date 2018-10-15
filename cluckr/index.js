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


app.use("/", clucksRouter);


app.get('/hello-world', function (req, res) {
    res.send('Hello, World!');
  });

app.get('/welcome', function (req, res) {
    res.render("welcome");
  });

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










const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});