<template>
	<view class="message_page">
		<view class="message_list">
			<navigator url="">
				
					<view class="user_info">
						<image src="../../static/user.jpg"></image>
						<view class="user_name">L</view>
					</view>
					<view class="message">
						哈哈哈哈
					</view>
					<view class="time">
						2020-10-23
					</view>
					<view class="message_num">
						<text>2</text>
					</view>
			</navigator>
			<navigator url="">
				
					<view class="user_info">
						<image src="../../static/user.jpg"></image>
						<view class="user_name">L</view>
					</view>
					<view class="message">
						哈哈哈哈
					</view>
					<view class="time">
						2020-10-23
					</view>
					<view class="message_num">
						2
					</view>
			</navigator>
			<navigator url="">
				
					<view class="user_info">
						<image src="../../static/user.jpg"></image>
						<view class="user_name">L</view>
					</view>
					<view class="message">
						哈哈哈哈
					</view>
					<view class="time">
						2020-10-23
					</view>
					<view class="message_num">
						2
					</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.message_list{
	background-color: #FFFFFF;
	
		navigator{
			width: 100%;
			height: 140rpx;
			
			border-bottom: 1rpx solid #dadada;
			
				
				.user_info{
					margin-left: 20rpx;
					image{
						float: left;
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin-top: 20rpx;
						
					}
					.user_name{
						margin-left: 120rpx;
						padding-top:30rpx ;
						font-size: 32rpx;
						font-weight: 600;
					}
				}
				.message{
					margin-top: 20rpx;
					margin-left: 140rpx;
				}
				.time{
					float: right;
					margin-right: 10rpx;
					margin-top: -100rpx;
				}
				.message_num{
					width: 40rpx;
					height: 40rpx;
					float: right;
					margin-right: 10rpx;
					margin-top: -40rpx;
					background-color: #D1372C;
					border-radius: 50rpx;
					color: #FFFFFF;
					 text-align: center;
				}
			
			
		}
	
}
</style>
