var app = app || {};

(function(app) {
	app.ChatRouter = Backbone.Router.extend({
		routes : {
			'' : 'chatLists',
			'chat-lists' : 'chatLists',
			'chat-lists/:id' : 'chatDetail'
		},
		chatLists : function() {
			console.log("Todo一覧表示用ビューにルーティング");
			new app.ChatCollectionView();
		},
		chatDetail : function() {
			alert('id = ' + id + ' のTODO詳細表示');
		},
	});
	app.socket = app.socket === undefined ? io.connect() : app.socket;
	app.socket.on('recieve', function(data) {
			var chatModel = new app.ChatModel();
			chatModel.attributes = data;
			app.chatCollection.addOne(chatModel);
	});
})(app);
