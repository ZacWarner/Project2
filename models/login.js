/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    }
  });

  Login.associate = function (models) {
    Login.hasMany(models.Seller, {
      onDelete: "cascade"
    });


    Login.hasMany(models.Products, {
      onDelete: "cascade"
    });
    Login.hasMany(models.Reviews, {
      onDelete: "cascade"
    });
  };
  return Login;
};
