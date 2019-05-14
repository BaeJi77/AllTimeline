module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
        event_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        descriptor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        detail_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
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