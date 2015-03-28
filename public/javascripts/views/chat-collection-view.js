var app = app || {};

//Todo一覧表示用ビュー
(function(app) {
	app.ChatCollectionView = Backbone.View.extend({
		el : '#content',
		tagName : 'div',
		chatCollection : {},
		initialize : function() {
			this.chatCollection = new app.ChatCollection();
			this.chatCollection.on('add', this.addOne, this);
			this.$el.html($('#list-template').html());
			this.newChat = this.$('#new-chat');
			this.render();
			app.chatCollection = this;
		},
		events : {
			'click #addChat' : 'onCreateChat',
		},
		render : function() {
			this.chatCollection.fetch();
			return this;
		},
		onCreateChat : function(e) {
			var obj = this.chatCollection.create(this.newAttributes(), {
				wait : true
			});
			this.newChat.val('');
//			this.chatCollection.fetch();
			this.emit(obj.toJSON());
		},
		addOne : function(chat) {
			var itemView = new app.ChatItemView({
				model : chat
			});
			$('#chat-lists').append(itemView.render().el);
		},
		emit : function(chat) {
			app.socket.emit('notice', {
				comment : chat.comment,
				status : chat.status,
				name : this.$('#displayName').text(),
			});
		},
		newAttributes : function() {
			return {
				comment : this.newChat.val().trim(),
				status : 0,
				name : this.$('#displayName').text(),
			}
		}
	});
})(app);
