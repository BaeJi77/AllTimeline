'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Category = require('./category.js')(sequelize, Sequelize);
db.Event = require('./event')(sequelize, Sequelize);

//Shop 1:N Shop
db.Category.hasMany(db.Event);
db.Event.belongsTo(db.Category);

sequelize.sync();


module.exports = db;
