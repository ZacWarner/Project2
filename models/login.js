var bcrypt = require("bcryptjs");


/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      validate: {
        isEmail: true
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

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Login.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Login.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
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
