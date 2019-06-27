/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
    // Get all reviews
    app.get("/api/reviews", function (req, res) {
        db.Reviews.findAll({}).then(function (results) {
            res.json(results);
        });
    });

    // Get seller specific reviews
    app.get("/api/reviews/seller/:id", function (req, res) {
        db.Reviews.findAll({
            where: {
                LoginId: req.params.id
            }
        }).then(function (results) {
            res.json(results);
        });
    });

    // Create a new review
    app.post("/api/reviews/newreview", function (req, res) {
        db.Reviews.create({
            reviewer_name: req.body.reviewer_name,
            review: req.body.review,
            product_id: req.body.product_id,
            LoginId: req.user.id
        }).then(function (result) {
            res.json(result);
        });
    });

    // Edit review
    app.put("/api/reviews/editreview/:reviewid", function (req, res) {
        db.Reviews.update({
            reviewer_name: req.body.reviewer_name,
            review: req.body.review,
            product_id: req.body.product_id,
            LoginId: req.user.id
        },
            {
                where: {
                    id: req.params.reviewid
                }
            }).then(function (result) {
                res.json(result);
            });
    });

    // Delete review
    app.delete("/api/reviews/delreview/:reviewid", function (req, res) {
        db.Reviews.destroy({
            where: {
                id: req.params.reviewid
            }
        }).then(function (result) {
            res.json(result);
        });
    });
};
