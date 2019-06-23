module.exports = (sequelize, DataTypes) => {
    return sequelize.define('peopleEvent', {
        event_name: {
            type: DataTypes.STRING,
        },
        descriptor: {
            type: DataTypes.STRING,
        },
        detail_url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            },
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue : -1,
        },
        start_date: {
            type: DataTypes.INTEGER,
        },
        end_date: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        duration: {
            type: DataTypes.INTEGER,
        }
    }, {
        timestamps: true,
    });
};