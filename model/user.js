module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: DataTypes.STRING,
		name: DataTypes.STRING,
		image_path: DataTypes.STRING,
	});
};


