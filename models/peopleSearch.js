module.exports = (sequelize, DataTypes) => {
    return sequelize.define('peopleSearch', {
        image: {
            type: DataTypes.STRING,
        },
        job: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: true,
    });
};