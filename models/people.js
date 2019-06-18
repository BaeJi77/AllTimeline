module.exports = (sequelize, DataTypes) => {
    return sequelize.define('people', {
        name: {
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