module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};