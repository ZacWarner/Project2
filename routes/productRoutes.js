/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");
require("../config/passport");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {
    // Get all product details
    app.get("/api/products", function (req, res) {
        db.Products.findAll({}).then(function (results) {
            res.json(results);
        });
    });

    // Get specific product details
    app.get("/api/products/:productid", function (req, res) {
        db.Products.findOne({
            where: {
                id: req.params.productid
            }
        }).then(function (result) {
            // res.json(results);
            let hbsObj = {
                products: result,
                user: req.user
            };
            console.log(hbsObj.products);
            res.render("productDetails", { hbsObj: hbsObj });
        });
    });

    // Get product details on category
    app.get("/api/products/filter/:category/:pricemin/:pricemax", function (req, res) {
        console.log("In routes");
        let whereCondition = {
            category: req.params.category,
            price: {
                [Op.gte]: req.params.pricemin,
                [Op.lte]: req.params.pricemax
            }
        };
        db.Products.findAll({
            where: whereCondition
        }).then(function (results) {
            // res.json(results);
            let hbsObj = {
                products: results,
                user: req.user
            };
            console.log(hbsObj.products);
            res.render("products", { hbsObj: hbsObj });
        });
    });

    // Get product details on specific seller
    app.get("/api/products/seller/:sellerid", function (req, res) {
        db.Products.findAll({
            where: {
                LoginId: req.params.sellerid
            }
        }).then(function (results) {
            res.json(results);
        });
    });

    // Create a new product
    app.post("/api/products/newproduct", function (req, res) {
        db.Products.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            picture: req.body.picture,
            description: req.body.description,
            LoginId: req.body.id
        }).then(function (result) {
            res.json(result);
        });
    });

    // Edit product details
    app.put("/api/products/editproduct/:productid", function (req, res) {
        db.Products.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        },
            {
                where: {
                    LoginId: req.body.id,
                    id: req.params.productid
                }
            }).then(function (result) {
                res.json(result);
            });
    });

    // Delete seller
    app.delete("/api/products/deleteproduct/:loginId/:id", function (req, res) {
        db.Products.destroy({
            where: {
                LoginId: req.params.loginId,
                id: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        });
    });
};
