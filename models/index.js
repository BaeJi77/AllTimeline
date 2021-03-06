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
db.CategoryEvent = require('./categoryEvent.js')(sequelize, Sequelize);
db.People = require('./people.js')(sequelize, Sequelize);
db.PeopleEvent = require('./peopleEvent.js')(sequelize, Sequelize);
db.PeopleSearch = require('./peopleSearch.js')(sequelize, Sequelize);
db.History = require('./history')(sequelize, Sequelize);
db.HistoryEvent = require('./historyEvent')(sequelize, Sequelize);

//Category 1 : N Event
db.Category.hasMany(db.CategoryEvent);
db.CategoryEvent.belongsTo(db.Category);


//People 1 : N Event
db.People.hasMany(db.PeopleSearch);
db.PeopleSearch.belongsTo(db.People);

db.PeopleSearch.hasMany(db.PeopleEvent);
db.PeopleEvent.belongsTo(db.PeopleSearch);

//History 1 : N Event
db.History.hasMany(db.HistoryEvent)
db.HistoryEvent.belongsTo(db.History);

sequelize.sync();

module.exports = db;
