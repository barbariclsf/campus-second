<template>
	<view class="first_tab">
		<view class="order_wrap">
			<view class="user_item">
				<image :src="userAvatar" mode="widthFix"></image>
				<view class="user_name">{{ userName }}</view>
				<view class="order_state">交易成功</view>
			</view>
			<view class="goods_item">
				<navigator class="goods_img_wrap" :url="'/pages/goodDetail/goodDetail?goodsId=' + goodsId ">
					<image :src="goodsUrl"></image>
				</navigator>
				<view class="goods_info_wrap">
					<rich-text class="goods_name" :nodes="description"></rich-text>
					<view class="goods_price">￥{{ nowPrice }}</view>
					<view class="order_date">{{ orderDate }}</view>
				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {

			goodsId: {
				type: Number,
				value: 0
			},

			goodsUrl: {
				type: String,
				value: ''
			},
			description: {
				type: String,
				value: ''
			},
			nowPrice: {
				type: Number,
				value: 0
			},
			userAvatar: {
				type: String,
				value: ''
			},
			userName: {
				type: String,
				value: ''
			},
			orderDate: {
				type: String,
				value: ''
			},
			


		},
		data() {
			return {

			};
		},
		methods: {
			updateGoods: function(goodsId) {
				this.$emit("updateGoods", goodsId);
			},
			deleteGoods: function(goodsId) {
				this.$emit("deleteGoods", goodsId);
			}
		}
	}
</script>

<style lang="less">
	.order_wrap {
		margin-top: 20rpx;
		
		border-bottom: 1px solid #f4f4f4;
		.user_item{
			display: flex;
			margin-left: 20rpx;
			image{
				width: 10%;
				border-radius: 50%;
			}
			.user_name{
				margin-top: 10rpx;
				margin-left: 20rpx;
				font-size: 36rpx;
			}
			.order_state{
				position: absolute;
				right: 20rpx;
				margin-top: 20rpx;
				color: #ff0000;
			}
		}
		.goods_item {
			display: flex;
			padding: 10rpx;
			padding-bottom: 20rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 20rpx;
			}
			

			.goods_info_wrap {

				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 20rpx;

				.goods_name {
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.goods_price {
					color: #ff0000;
					
				}
				.order_date{
					position: absolute;
					right: 20rpx;
					margin-top: 60rpx;
					color: #666;
				}

				.operation {
					display: flex;
					position: absolute;
					right: 20rpx;
					margin-top: 60rpx;
					color: #666;

					.iconfont {
						margin-left: 50rpx;
					}
				}
			}
		}
	}
</style>
