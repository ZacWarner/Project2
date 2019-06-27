/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");

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
        }).then(function (results) {
            res.json(results);
        });
    });

    // Get product details on category
    app.get("/api/products/categories/:category", function (req, res) {
        db.Products.findAll({
            where: {
                category: req.params.category
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
            LoginId: req.user.id
        }).then(function (result) {
            res.json(result);
        });
    });

    // Edit product details
    app.put("/api/products/editproduct/:productid", function (req, res) {
        db.Products.update({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            picture: req.body.picture,
            description: req.body.description,
            LoginId: req.user.id
        },
            {
                where: {
                    id: req.params.productid
                }
            }).then(function (result) {
                res.json(result);
            });
    });

    // Delete seller
    app.delete("/api/products/deleteproduct/:id", function (req, res) {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        });
    });
};
