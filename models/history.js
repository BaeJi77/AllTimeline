module.exports = (sequelize, DataTypes) => {
    return sequelize.define('history', {
        category_name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};