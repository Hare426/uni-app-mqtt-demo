<template>
	<view class="uni-column">
		<view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
			<scroll-view id="scrollview" scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true"
			    :scroll-top="scrollTop">
				<message-show v-for="(message,index) in messageA" :key="index" :message="message" :cid="index"></message-show>
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<view class="foot">
			<chat-input @send-message="getInputMessage" @focus="inputGetFocus"></chat-input>
		</view>
	</view>
</template>

<script>
	import chatInput from '@/components/im-chat/chatinput.vue';
	import messageShow from '@/components/im-chat/messageshow.vue';
	var $mqtt = require("@/utils/js/mqttws31-auto.js");
	export default {
		data() {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
				},
				messageA: [],
				scrollTop: 0,
				targetName:'To',
			}
		},
		components: {
			chatInput,
			messageShow
		},
		onLoad: function () {
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
			uni.clearStorage();
		},
		created() {
			this.setText();
			this.getMsg();
			delete this.mqtt.options.mqttVersionExplicit;
			this.mqtt.client.connect(this.mqtt.options);
		},
		// 下拉刷新功能
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			//标题栏文字改为医生
			setText:function() {
				uni.setNavigationBarTitle({
					title: this.targetName
				})
			},
			getInputMessage: function (message) { //获取子组件的输入数据
				this.mqtt.addMessage('customer', message.content, false);
				this.sendMessage(message.content);			
				this.mqtt.saveMsg();
				this.messageA = this.mqtt.messageAll;		
			},
			// 读取本地缓存的消息
			getMsg: function (){
				// var that = this;
				// uni.getStorage({
				// 	key: 'storage_msg',
				// 	success: function (res) {
				// 		that.messageA = res.data;
				// 	}
				// });
			},
			scrollToBottom: function () {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec(function (res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function (rect) {
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});

					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			},
			sendMessage: function (info) {
				var message = new $mqtt.Message(JSON.stringify(
				    {type: 0x10, target: "To", content:  info, extend: "123"}));
					message.qos =1;
					message.destinationName = 'sendMessage';
				this.mqtt.client.send(message);	
			},

		}
	}
</script>

<style>
	.foot{
		height: auto!important;
	}
	
	.uni-column {
		display: flex;
		flex-direction: column;
	}

	.content {

		display: flex;
		flex: 1;
		margin-bottom: 100upx;
	}

	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}
</style>
