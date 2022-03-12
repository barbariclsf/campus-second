<template>
	<view class="first_tab">
		
		<view class="goods_item" >
			<navigator class="goods_img_wrap" :url="'/pages/goodDetail/goodDetail?goodsId=' + goodsId ">
				<image :src="imgList[0].goodsImg"></image>
			</navigator>
			<view class="goods_info_wrap">
				<rich-text class="goods_name" :nodes="goodsInfo.description"></rich-text>
				<view class="goods_price">￥{{ goodsInfo.nowPrice }}</view>
			</view>
			
		</view>
		<view class="remark">
			<view class="title">备注信息</view>
			<input type="text" v-model="remark" placeholder=" 请输入">
		</view>
		
		<view class="btn_tool">
			<view class="tip">应付款</view>
			<view class="price">￥{{ goodsInfo.nowPrice }}</view>
			<button class="btn_buy" @click="buy">确认购买</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo:{},
				imgList:[],
				remark:''
			}
		},
		onLoad(option){
			this.loadOrderDate(option.goodsId);
		},
		methods: {
			buy:function(){
				this.$post('order/insertOrder', {
					goodsId: this.goodsInfo.goodsId,
					publicerId:this.goodsInfo.userId,
					payerId:uni.getStorageSync('userInfo').userId,
					totalPrice:this.goodsInfo.nowPrice,
					num:1,
					remark:this.remark
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							this.$toast(res.message, 1000, 'none', true);
							uni.navigateTo({
								url:'../order/order'
							})
						} else {
							this.$toast(res.message, 1000, 'none', true);
						}
					} else {
						this.$toast('出错了', 1000, 'none', true);
					}
				}).catch(err => {
					this.$toast('出错了', 1000, 'none', true);
				})
				
			},
			loadOrderDate:function(goodsId){
				this.$post('goods/selectByGoodsId', {
					goodsId: goodsId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							
							this.goodsInfo = res.data.goods;
							this.imgList = res.data.imgList;
							
							this.$toast(res.message, 1000, 'none', true);
						} else {
							this.$toast(res.message, 1000, 'none', true);
						}
					} else {
						this.$toast('出错了', 1000, 'none', true);
					}
				}).catch(err => {
					this.$toast('出错了', 1000, 'none', true);
				})
				
			}
		}
	}
</script>

<style lang="less">
	.goods_item {
		display: flex;
		
		background-color: #FFFFFF;
		margin: 20rpx;
		height: 250rpx;
		-moz-box-shadow: 0 0 10px #f0f0f0;
		-webkit-box-shadow: 0 0 10px #f0f0f0;
		box-shadow: 0 0 10px #f0f0f0;
		border-radius: 20rpx;
		image {
			margin-top: 20rpx;
			margin-left: 20rpx;
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
	.remark{
		
		margin: 20rpx;
		height: 170rpx;
		background-color: #FFFFFF;
		.title{
			font-size: 32rpx;
			padding: 20rpx;
			border-bottom: 1rpx solid #f1f1f1;
		}
		input{
			margin: 20rpx;
			background-color: #f1f1f1;
			border-radius: 20rpx;
		}
	}
	.btn_tool{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		border-radius: 20rpx;
		.tip{
			margin-left: 30rpx;
			margin-top: 30rpx;
			font-size: 32rpx;
		}
		.price{
			margin-top: 30rpx;
			font-size: 32rpx;
			color: #ff0000;
			
		}
		.btn_buy{
			position: absolute;
			right: 20rpx;
			height: 80rpx;
			margin-top: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #ff0000;
			font-size: 32rpx;
			color: #FFFFFF;
			border-radius: 50rpx;
		}
	}
</style>
