var app = app || {};

//Todoデータ１件を表すモデル
(function(app) {
	app.ChatModel = Backbone.Model.extend({
		urlRoot : '/chat/',
		parse : function(response) {
			//モデルをパース
			console.log("モデルをパース");
			console.log(response);
			return response;
		},
		toggle : function() {
			this.set('status', this.get("status") === '1' ? '0' : '1');
			this.save();
		}
	});
})(app);
