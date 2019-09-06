<template>
	<view class="footer">
		<view class="footer-left">
			<view class="uni-icon uni-icon-mic" @tap="startRecognize"> </view>
		</view>
		<view class="footer-center">
			<input class="input-text" type="text" v-model="inputValue"></input>
		</view>
		<view class="footer-right" @tap="sendMessge">
			<view id='msg-type' >发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "chat-input",
		data() {
			return {
				inputValue: ''
			}
		},
		methods: {
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'iFly';
				that.inputValue = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.inputValue += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			},
			sendMessge: function () {
				var that = this;
				if (that.inputValue.trim() == '') {

					that.inputValue = '';
				} else {

					//点击发送按钮时，通知父组件用户输入的内容
					this.$emit('send-message', {
						type: 'text',
						content: that.inputValue
					});
					that.inputValue = '';
				}
			}
		}
	}
</script>

<style>
	.footer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80upx;
		min-height: 80upx;
		/* border-top: solid 1px #bbb; */
		overflow: hidden;
		padding: 14upx;
		align-items: center;
		/* background-color: #fafafa; */
	}
	.footer-left {
		width: 0upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer-right {
		/* width: 120upx;
		height: 80upx; */
		display: flex;
		justify-content: center;
		align-items: center;
		/* color: #1482D1; */
		width: 130upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 30upx;
		background: linear-gradient(90deg,rgba(80,134,255,1) 0%,rgba(51,100,236,1) 100%);
		color: #fff;
		margin-right: 40upx;
		font-size: 28upx;
	}
	.footer-center {
		flex: 1;
		height: 76upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 24upx;
	}
	.footer-center .input-text {
		flex: 1;
		background: #fff;
		/* border: solid 1upx #ddd; */
		padding: 18upx 28upx !important;
		font-family: verdana !important;
		overflow: hidden;
		/* border-radius: 15upx; */
		border: solid 1upx #eee;
		border-radius: 38upx;
		font-size: 28upx;
	}
	.uni-input-wrapper {
	    padding: 0 28px;
	}
</style>
