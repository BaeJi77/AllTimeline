module.exports = (sequelize, DataTypes) => {
    return sequelize.define('historyEvent', {
        event_name: {
            type: DataTypes.STRING(20),
            unique: true,
        },
        descriptor: {
            type: DataTypes.STRING,
        },
        detail_url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        picture: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
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