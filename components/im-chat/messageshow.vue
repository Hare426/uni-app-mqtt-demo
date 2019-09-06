<template>
	<view class="m-item" :id="'message'+cid">
		<view class="m-left">
			<image class="head_icon" src="../../static/img/doctor.png" v-if="message.user=='home'"></image>
		</view>
		<view class="m-content">
			<view class="m-content-head" :class="{'m-content-head-right':message.user=='customer'}">
				<view :class="'m-content-head-'+message.user">{{message.content}} </view>
			</view>
		</view>
		<view class="m-right">
			<!-- <image class="head_icon" src="../../static/img/patient.png" v-if="message.user=='customer'"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			message: {
				type: Object,
				default() {
                    return {};
                }
			},
			cid: {
				type: [Number, String],
				default: ''
			}
		}
	}
</script>

<style>
	.m-item {
		display: flex;
		flex-direction: row;
		padding-top: 40upx;
	}

	.m-left {
		display: flex;
		width: 130upx;
		justify-content: center;
		align-items: flex-start;
	}

	.m-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		word-break: break-all;
	}

	.m-right {
		display: flex;
		width: 120upx;
		width: 40upx;
		justify-content: center;
		align-items: flex-start;
	}

	.head_icon {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		border:  1upx solid #eee;
	}

	.m-content-head {
		position: relative;
	}

	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}

	.m-content-head-customer {
		text-align: left;
		font-size: 28upx;
		background: linear-gradient(86deg,rgba(80,134,255,1) 0%,rgba(51,100,236,1) 100%);
		border-radius: 42upx 4upx 42upx 42upx;
		padding: 20upx 28upx;
		color: #fff;
	}

	.m-content-head-home {
		display: inline-block;
		font-size: 28upx;
		background: #f7f7f7;
		color: #333;
		border-radius: 14upx;
		padding: 20upx 28upx;
		border-radius: 4upx 42upx 42upx 42upx;
	}
</style>
