<template>
	<view class="first_tab">
		<view class="goods_item" >
			<navigator class="goods_img_wrap" :url="'/pages/goodDetail/goodDetail?goodsId=' + goodsId + '&userId=' + userId ">
				<image :src="goodsUrl"></image>
			</navigator>
			<view class="goods_info_wrap">
				<rich-text class="goods_name" :nodes="description"></rich-text>
				<view class="goods_price">￥{{ nowPrice }}</view>
				<view v-if="operation == '0'" class="operation">
					<view class="iconfont icon-shuxie" @click="updateGoods(goodsId)"></view>
					<view class="iconfont icon-shanchu" @click="deleteGoods(goodsId)"></view>
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
			userId: {
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

			publicDate: {
				type: String,
				value: ''
			},
			operation:{
				type:String,
				value:''
			}


		},
		data() {
			return {

			};
		},
		methods:{
			updateGoods:function(goodsId){
				this.$emit("updateGoods",goodsId);
			},
			deleteGoods:function(goodsId){
				this.$emit("deleteGoods",goodsId);
			}
		}
	}
</script>

<style lang="less">
	.goods_item {
		display: flex;
		padding: 10rpx;
		border-bottom: 1px solid #f4f4f4;
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
				color: #DD524D;
				font-size: 32rpx;
			}

			.operation {
				display: flex;
				position: absolute;
				right: 20rpx;
				margin-top: 60rpx;
				color: #666;
				.iconfont{
					margin-left: 50rpx;
				}
			}
		}
	}
</style>
