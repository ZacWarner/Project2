module.exports = function (sequelize, DataTypes) {
    var Products = sequelize.define("Products", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        price: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            len: [1]
        },
        category: {
            type: DataTypes.STRING,
        },
        picture: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        }
    });

    Products.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Products.belongsTo(models.Login, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Products;
};