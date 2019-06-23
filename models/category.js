module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
        category_name: {
            type: DataTypes.STRING,
            unique: true,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
    });
};

