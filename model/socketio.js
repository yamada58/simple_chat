var io = require('socket.io');

module.exports = sio;

function sio(server) {

	var sio = io.listen(server);

	sio.sockets.on("connect", function(socket) {
		console.log('connect!!!!');

		// 通知受信
		socket.on('notice', function(data) {
			console.log('notice');
			console.log(data);
			// すべてのクライアントへ通知を送信
			// ブロードキャスト
			socket.broadcast.emit('recieve', {
				name : data.name,
				status : data.status,
				comment : data.comment,
			});
		});
	});

	// 切断
	sio.sockets.on("disconnect", function() {
		console.log('disconnect!!!!');
	});
}
