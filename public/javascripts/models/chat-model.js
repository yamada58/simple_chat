var app = app || {};

//Todoデータ１件を表すモデル
(function(app) {
	app.ChatModel = Backbone.Model.extend({
		urlRoot : '/chat/',
		parse : function(response) {
			//モデルをパース
			return response;
		},
		toggle : function() {
			this.set('status', this.get("status") === '1' ? '0' : '1');
			this.save();
		}
	});
})(app);
