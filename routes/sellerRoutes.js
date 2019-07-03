/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");
const sgMail = require('@sendgrid/mail');
require("../config/passport");

module.exports = function (app) {
  // Get all seller details
  app.get("/api/sellers", function (req, res) {
    db.Seller.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  // Get specific seller details
  app.get("/api/sellers/id/:sellerid", function (req, res) {
    db.Seller.findOne({
      where: {
        id: req.params.sellerid
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  //get specific seller based on name
  app.get("/api/sellers/name/:sellerName", function (req, res) {
    db.Seller.findOne({
      where: {
        name: req.params.sellerName
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
    }).catch(function (err) {
      console.log(err);
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
          LoginId: req.user.id,
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

  // Send email to seller
  app.post("/api/sellers/sendemail", function (req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      to: req.body.to,
      from: req.body.from,
      subject: "Interested in your product",
      text: req.body.message,
      html: "<strong>" + req.body.message + "</strong>",
    };
    sgMail.send(message);
    res.json("Email Sent to " + req.body.to);
  });
};
