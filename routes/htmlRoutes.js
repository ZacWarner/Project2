var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });
  // Load Signup page
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  // Load Login page
  app.get("/login", function (req, res) {
    res.render("login");
  });
  // Load searchSeller page
  app.get("/searchSeller", function (req, res) {
    res.render("searchSeller");
  });

<<<<<<< HEAD
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
=======
  // Load products page and pass in a table by id
  app.get("/project_2.products/:id", function (req, res) {
    db.project_2.products
      .findOne({ where: { id: req.params.id } })
      // eslint-disable-next-line camelcase
      .then(function (dbproject_2) {
        res.render("project_2.products", {
          // eslint-disable-next-line camelcase
          products: dbproject_2.products
        });
>>>>>>> dc1d952400ea396b4ddec208c734a3ccdf9b89df
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
