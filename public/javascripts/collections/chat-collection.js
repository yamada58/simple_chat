var app = app || {};

//Todo一覧表示用コレクション
(function(app) {
	app.ChatCollection = Backbone.Collection.extend({
		url : '/chat',
		model : app.ChatModel,
		parse : function(response) {
			//コレクションをパース
			return response.chat_lists;
		}
	});
})(app);
