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

//   app.get('/clucks', function (req, res) {
//     res.render('index');
//   });



const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});