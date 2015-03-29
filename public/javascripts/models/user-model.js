var app = app || {};

//Userデータ１件を表すモデル
(function(app) {
	app.UserModel = Backbone.Model.extend({
		urlRoot : '/user/',
		parse : function(response) {
			console.log(response);
			//モデルをパース
			return response.user;
		},
	});
})(app);
