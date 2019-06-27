module.exports = function(sequelize, DataTypes) {
  var Reviews = sequelize.define("Reviews", {
    // eslint-disable-next-line camelcase
    reviewer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    review: {
      type: DataTypes.TEXT
    },
    // eslint-disable-next-line camelcase
    product_id: {
      type: DataTypes.INTEGER
    }
  });

  Reviews.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Reviews.belongsTo(models.Login, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reviews;
};
