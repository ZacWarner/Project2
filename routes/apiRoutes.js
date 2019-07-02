var db = require("../models");

module.exports = function(app) {
  // Get all from products
  app.get("/api/project_2.products", function(req, res) {
    // eslint-disable-next-line camelcase
    db.project_2.products.findAll({}).then(function(dbproject_2) {
      // eslint-disable-next-line camelcase
      res.json(dbproject_2.products);
    });
  });

  // Create a new product
  app.post("/api/project_2.products", function(req, res) {
    // eslint-disable-next-line camelcase
    db.project_2.products.create(req.body).then(function(dbproject_2) {
      // eslint-disable-next-line camelcase
      res.json(dbproject_2.products);
    });
  });

  // Delete a product by id
  app.delete("/api/project_2.products/:id", function(req, res) {
    db.project_2.products
      .destroy({ where: { id: req.params.id } })
      // eslint-disable-next-line camelcase
      .then(function(dbproject_2) {
        // eslint-disable-next-line camelcase
        res.json(dbproject_2.products);
      });
  });
};
