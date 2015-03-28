var app = app || {};

(function(app) {
	app.ChatItemView = Backbone.View.extend({
		//DOMに要素追加のタグ名
		tagName : 'tr',
		//テンプレート
		template : _.template($('#item-template').html()),

		//DOMイベントハンドラ設定
		events : {
			//チェックボックスクリック時
			'click .toggle' : 'onStatusToggleClick',
		},

		initialize : function() {
		},
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		onStatusToggleClick : function(e) {
			this.model.toggle();
		},
	});
})(app);
