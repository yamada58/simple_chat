var app = app || {};

//Todo一覧表示用ビュー
(function(app) {
	app.ChatCollectionView = Backbone.View.extend({
		el : '#content',
		tagName : 'div',
		chatCollection : {},
		userModel : {},
		initialize : function() {
			this.chatCollection = new app.ChatCollection();
			this.chatCollection.on('add', this.addOne, this);
			this.$el.html($('#list-template').html());
			var userView = new app.ChatUserView();
			this.userModel = userView.model;
			this.$('#user').html(userView.el);
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
			console.log(this.userModel);
			app.socket.emit('notice', {
				comment : chat.comment,
				status : chat.status,
				name : this.userModel.attributes.name,
				image_path : this.userModel.attributes.image_path,
			});
		},
		newAttributes : function() {
			return {
				comment : this.newChat.val().trim(),
				status : 0,
				name : this.userModel.attributes.name,
				image_path : this.userModel.attributes.image_path,
			}
		}
	});
})(app);
