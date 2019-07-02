/* eslint-disable prettier/prettier */
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

var passport = require("./config/passport");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//passport stuffs
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/loginRoutes")(app);
require("./routes/sellerRoutes")(app);
require("./routes/reviewRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
<<<<<<< HEAD
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
=======
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
>>>>>>> dc1d952400ea396b4ddec208c734a3ccdf9b89df
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
