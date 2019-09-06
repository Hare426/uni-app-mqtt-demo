let $mqtt = require('@/utils/js/mqttws31-auto.js');
let options = {
	timeout: 1000 * 1000,
	userName: 'Re',
	password: 'pass',
	useSSL: true, //如果使用 HTTPS 加密则配置为 true
	keepAliveInterval: 10,
	mqttVersion: 4,
	onSuccess: function onConnect() { //连接成功
		console.log('连接成功');
	},
	onFailure: function(message) { //连接失败
		console.log('连接失败', JSON.stringify(message));
	}
};
let clientId = Math.floor(Math.random()*10000) + "";

let url = 'youselfUrl';
let port = 12345;

let client = new $mqtt.Client(url, port, clientId);

client.onConnectionLost = function onConnectionLost(response) {
	console.log('onConnectionLost',JSON.stringify(response));
};
client.onMessageArrived = function onMessageArrived(message) {
	let payload = message.payloadString;
	let chat = JSON.parse(payload.toString());
	console.log('收到来自', chat.source, '的消息', payload.toString())
	addMessage('home',JSON.parse(payload).content,false)
	saveMsg();
	// console.log('收到保存之后messageAll'+JSON.stringify(messageAll))
};

let messageAll = [];

/* uni.getStorage({
	key: 'storage_msg',
	success: function (res) {
		console.log(res.data)
		 messageAll= res.data;
	}
}); */

function addMessage(user, content, hasSub, subcontent) {
	messageAll.push({
		user: user,
		content: content,
		hasSub: hasSub,
		subcontent: subcontent
	});
	// console.log(messageAll)
}

function saveMsg(){
	// uni.setStorage({
	// 	key: 'storage_msg',
	// 	data: messageAll,
	// 	success: function () {
	// 		console.log('消息已存储');
	// 		// console.log(messageAll)
	// 	}
	// });
}

export {
	client,
	options,
	messageAll,
	addMessage,
	saveMsg
}
