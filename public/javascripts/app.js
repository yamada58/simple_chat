var app = app || {};

(function(app) {
	app.socket = io.connect();
	app.socket = app.socket === undefined ? io.connect() : app.socket;
	var chatRouter = new app.ChatRouter();
	Backbone.history.start();
})(app);
