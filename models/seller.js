/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
    var Seller = sequelize.define("Seller", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 15]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 50]
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Seller.associate = function (models) {
        Seller.belongsTo(models.Login, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Seller;
};
