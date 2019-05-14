module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
        category_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};