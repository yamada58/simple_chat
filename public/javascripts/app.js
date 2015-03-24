var app = app || {};

(function(app) {
	var chatRouter = new app.ChatRouter();
	Backbone.history.start();
})(app);
