module.exports = function (sequelize, DataTypes) {
    var Reviews = sequelize.define("Reviews", {
        reviewer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        review: {
            type: DataTypes.TEXT,
        },
        product_id: {
            type: DataTypes.INT,
        }
    });

    Reviews.associate = function (models) {
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