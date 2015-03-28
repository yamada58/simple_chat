var config = require('config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password,config.sequelize.options);

global.db = {
	Sequelize: Sequelize,
	sequelize: sequelize,
	ChatLists: sequelize.import(__dirname + '/chatlists'),
	User:      sequelize.import(__dirname + '/user')
}
module.exports = global.db;
