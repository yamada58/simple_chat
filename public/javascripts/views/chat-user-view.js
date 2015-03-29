var app = app || {};

(function(app) {
	app.ChatUserView = Backbone.View.extend({
		//DOMに要素追加のタグ名
		tagName : 'ui',
		//テンプレート
		template : _.template($('#user-template').html()),

		initialize : function() {
			this.model = new app.UserModel();
			this.listenTo(this.model, 'sync', this.render);
			this.model.fetch({
				wait : true
			});
		},
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
	});
})(app);
