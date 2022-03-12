<template>
	<view class="square_page">
		<navigator class="goods_wrap" v-for="(item,index) in goodsList" :key="index" :url="'/pages/goodDetail/goodDetail?goodsId=' + item.goods.goodsId">
			<view class="user_info">
				<image :src="item.user.avatar" mode="widthFix"></image>
				<view class="use_info_item">
					<view class="user_name">{{ item.user.userName }}</view>
					<view class="public_date">发布于{{item.goods.publicDate }}</view>
				</view>
			</view>
			<view class="goods_info">
				<rich-text class="goods_description" :nodes="item.goods.description"></rich-text>
				<view class="goods_imgs" >
					<navigator  v-for="(item1,index1) in item.imgList" :key="index1" v-if="item.imgList.length >= 3 && index1 < 3">
						<image :src="item1.goodsImg" ></image>
					</navigator>
					<navigator v-if="item.imgList.length < 3 ">
						<image :src="item.imgList[0].goodsImg" ></image>
					</navigator>
				</view>
			</view>

		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[]
			}
		},
		onShow(){
			this.loadData();
		},
		methods: {
			loadData:function(){
				this.$get('goods/selectAll'
					).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							
							console.log(res);
							this.goodsList = res.data;
							
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
	.goods_wrap {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #f1f1f1;
		.user_info {
			display: flex;
			margin-left: 20rpx;
			margin-top: 20rpx;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			.use_info_item {
				margin-left: 20rpx;

				.user_name {
					font-size: 32rpx;

				}

				.public_date {
					margin-top: 10rpx;
					font-size: 26rpx;
					color: #666;
				}
			}
		}

		.goods_info {
			margin: 20rpx;
			width: 95%;

			.goods_description {
				display: -webkit-box;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
			}

			.goods_imgs {
				overflow: hidden;
				padding: 10rpx 0;
				margin-left: 20rpx;
				navigator {
					float: left;
					width: 48%;
					height: 400rpx;
					
					&:nth-child(2),&:nth-child(3) {
						height: 195rpx;
						margin: 0 10rpx;
						border-bottom: 10rpx solid #fff;
					}

					image {
						width: 100%;
						height: 100%;
						border-radius: 20rpx;
					}
				}
			}
		}
	}
</style>
