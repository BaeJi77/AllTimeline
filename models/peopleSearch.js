module.exports = (sequelize, DataTypes) => {
    return sequelize.define('peopleSearch', {
        person_name: {
            type: DataTypes.STRING,
        },
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