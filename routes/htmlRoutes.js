/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    let you = req.user;

    res.render("index", { user: you });
  });
  // Load Signup page
  app.get("/signup", function (req, res) {

    res.render("signup");
  });

  // Seller public profile
  app.get("/sellercover/:sellerid", function (req, res) {
    let id = req.params.sellerid;
    console.log("Id in htmlroute: " + id);
    res.render("pubProfile", { sellerId: id });
  });

  // Seller private profile
  app.get("/profile/:sellerid/:sellername", function (req, res) {
    let sellerObj = {
      sellerid: req.params.sellerId,
      sellername: req.params.sellername
    };
    //console.log("Id in htmlroute: " + id);
    res.render("profile", { sellerObj: sellerObj });
  });

  // Load Login page
  app.get("/login", function (req, res) {
    res.render("login");
  });
  // Load searchSeller page
  app.get("/searchSeller", function (req, res) {
    db.Seller.findAll({}).then(function (data) {

      let hbsObj = {
        sellers: data,
        user: req.user
      };
      res.render("searchSeller", { hbsObj: hbsObj });

    });

  });
  // Load products page
  app.get("/products", function (req, res) {
    db.Products.findAll({}).then(function (data) {

      let hbsObj = {
        products: data,
        user: req.user
      };

      res.render("products", { hbsObj: hbsObj });
    });
    let you = req.user;


  });

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
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
