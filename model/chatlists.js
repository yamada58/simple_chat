module.exports = function(sequelize, DataTypes) {
	return sequelize.define('chat_lists', {
		comment: DataTypes.STRING,
		status: 'int(10)',
		name: DataTypes.STRING
	});
};


