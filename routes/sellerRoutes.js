/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  // Get all seller details
  app.get("/api/sellers", function (req, res) {
    db.Seller.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  // Get specific seller details
  app.get("/api/sellers/:sellerid", function (req, res) {
    db.Seller.findOne({
      where: {
        id: req.params.sellerid
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // Create a new seller
  app.post("/api/sellers/newseller", function (req, res) {
    db.Seller.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      photo: req.body.photo,
      LoginId: req.user.id
    }).then(function (result) {
      res.json(result);
    });
  });

  // Edit seller details
  app.put("/api/sellers/editseller/:sellerid", function (req, res) {
    db.Seller.update({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      photo: req.body.photo,
      LoginId: req.user.id
    },
      {
        where: {
          id: req.params.sellerid
        }
      }).then(function (result) {
        res.json(result);
      });
  });

  // Delete required only if not handled in Login module

  /*
  // Delete seller
  app.delete("/api/sellers/deleteseller/:id", function (req, res) {
    db.Seller.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });
  });
  */
};
