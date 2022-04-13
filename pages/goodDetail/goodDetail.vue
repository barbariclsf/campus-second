<template>
	<view class="sc_goods">

		<view class="user_info">
			<image :src="publicerInfo.avatar" mode="widthFix" @click="toUserDetail(publicerInfo.userId)"></image>
			<view class="user_msg">
				<view class="user_name">{{ publicerInfo.userName }}</view>
				<view class="user_address">发布于{{ publicerInfo.address }}</view>
			</view>
			
		</view>


		<view class="goods_wrap">
			<view class="goods_info">
				<view class="goods_price">￥{{ goodsInfo.nowPrice }}</view>
				<rich-text class="goods_name" :nodes="goodsInfo.description"></rich-text>
			</view>
			<view class="goodsImgs">
				<image v-for="(item,index) in imgList" :key="index" :src="item.goodsImg" mode="widthFix"></image>

			</view>

		</view>
		<view class="comment_wrap">
			<view class="title">
				留言
			</view>
			<view class="comment_info">
				<view class="my" v-if="userInfo != ''">
					<image :src="publicerInfo.avatar" mode="widthFix"></image>
					<input v-model="msgInput" placeholder="    看对眼就留言..." placeholder-style="color:#666" @confirm="addMsg" />
				</view>
				<view class="comment_list" v-for="(item,index) in commentList" :key="index">
					<image :src="item.user.avatar" mode="widthFix"></image>
					<view class="info">
						<view class="commenter_name">{{ item.user.userName }}</view>
						<view class="content">{{ item.comment.content }}</view>
					</view>
					<view class="time">{{ item.comment.publicDate }}</view>
					<view v-if="item.user.userId == item.comment.userId" class="iconfont icon-shanchu" @click="deleteComment(item.comment.id)"></view>
				</view>

			</view>
			<view class="see_allmsg">
				<text>查看所有留言 ></text>
			</view>
		</view>

		<view class="recommend">
			<view class="title">
				<image src="../../static/heartDance.png" mode="widthFix"></image>
				<view class="title_name">
					为你推荐
				</view>
			</view>
			<view class="goodsList">
				<column-goods-card v-for="(item,index) in goodsList" :key="index" :goodsId="item.goods.goodsId" :userId="item.goods.userId"
				 :goodsUrl="item.imgList[0].goodsImg" :description="item.goods.description" :nowPrice="item.goods.nowPrice"
				 :oldPrice="item.goods.oldPrice" :label="item.goods.label" :grade="item.goods.grade" :publicDate="item.goods.publicDate">
				</column-goods-card>
			</view>

		</view>

		<view class="btn_tool">
			<view class="tool_item">
				<view class="iconfont icon-fenxiang"></view>
				<view class="">分享</view>
				<button open-type="share"></button>
			</view>
			<view v-if="!isCollect" class="tool_item" @click="collectGoods">
				<view class="iconfont icon-shoucang"></view>
				<view class="collect_btn">收藏</view>
			</view>
			<view v-if="isCollect" class="tool_item" @click="deletecollectGoods">
				<view class="iconfont icon-shoucang2"></view>
				<view class="collect_btn">取消收藏</view>
			</view>
			<!-- <view class="tool_item">
				<view class="iconfont icon-liuyan"></view>
				<view class="">聊天</view>
			</view>
			<view class="tool_item btn_sell">
				<view>我也卖</view>
			</view> -->
			<view v-if="goodsInfo.state == 1" class="tool_item btn_buy" @click="toOrderDetail(goodsInfo.goodsId)">
				<view>我想要</view>
			</view>
			<view v-else class="tool_item btn_buy">
				<view>该商品已被购买</view>
			</view>

		</view>

	</view>
</template>

<script>
	import columnGoodsCard from '@/components/columnGoodsCard.vue';
	export default {
		components: {
			columnGoodsCard
		},
		data() {
			return {
				publicerInfo: {},
				goodsInfo: {},
				imgList: [],
				goodsList: [],
				isCollect: false,
				msgInput: '',
				commentList:[],
				userInfo:{}
			}
		},
		onLoad(option) {
			this.userInfo = uni.getStorageSync('userInfo');
			this.loadData(option.goodsId);
			this.loadCommentData(option.goodsId)
			this.isCollectData(option.goodsId);
		},
		methods: {
			toOrderDetail:function(goodsId){
				if (uni.getStorageSync('userInfo') == '') {
					uni.showModal({
						title: '登录提示',
						content: '您还未登录, 请先登录',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.switchTab({
									url: '../user/user'
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url:'../orderDetail/orderDetail?goodsId=' + goodsId
					})
				}
				
			},
			toUserDetail:function(userId){
				uni.navigateTo({
					url:'../userDetail/userDetail?userId=' + userId
				})
			},
			deleteComment:function(id){
				this.$post('comment/deleteComment', {
					id:id
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							this.commentList.forEach((v,i) => {
								if(v.comment.id == id){
									this.commentList.splice(i,1);
								}
							})
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
			},
			addMsg: function() {
				this.$post('comment/insertComment', {
					goodsId: this.goodsInfo.goodsId,
					userId: this.userInfo.userId,
					content: this.msgInput
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log(res);
							this.commentList.push(res.data);
							this.msgInput = '';
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
			},
			loadCommentData:function(goodsId){
				this.$post('comment/selectByGoodsId', {
					goodsId: goodsId,	
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log(res);
							this.commentList = res.data;
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
			},
			isCollectData: function(goodsId) {
				console.log(goodsId)
				this.$post('collect/selectIsCollect', {
					userId: this.userInfo == '' ? 0 : this.userInfo.userId,
					goodsId: goodsId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log(res);
							if (res.data != null) {
								this.isCollect = true;
							}
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
			},
			deletecollectGoods: function() {
				if (uni.getStorageSync('userInfo') == '') {
					uni.showModal({
						title: '登录提示',
						content: '您还未登录, 请先登录',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.switchTab({
									url: '../user/user'
								})
							}
						}
					})
				} else {
					this.$post('collect/deleteCollect', {
						userId: this.userInfo.userId,
						goodsId: this.goodsInfo.goodsId
					}).then(res => {
						if (res.code == 200) {
							if (res.result == 'success') {
								console.log(res);
								this.isCollect = false;
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
			},
			collectGoods: function() {
				if (uni.getStorageSync('userInfo') == '') {
					uni.showModal({
						title: '登录提示',
						content: '您还未登录, 请先登录',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.switchTab({
									url: '../user/user'
								})
							}
						}
					})
				} else {
					this.$post('collect/insertOne', {
						userId: this.userInfo.userId,
						goodsId: this.goodsInfo.goodsId
					}).then(res => {
						if (res.code == 200) {
							if (res.result == 'success') {
								console.log(res);
								this.isCollect = true
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

			},
			loadData: function(goodsId) {
				this.$post('goods/selectByGoodsId', {
					goodsId: goodsId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log(res);
							this.publicerInfo = res.data.user;
							this.goodsInfo = res.data.goods;
							this.imgList = res.data.imgList;
							this.goodsList = uni.getStorageSync('goodsList');
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
	page {
		background-color: #FFFFFF;
	}

	.user_info {
		display: flex;
		margin: 20rpx;

		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}

		.user_msg {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;

			.user_name {
				margin-top: 20rpx;
				font-size: 32rpx;
				color: #0c0c0c;
				font-weight: 700;
			}

			.user_address {
				margin-top: 10rpx;
				color: #666;
			}
		}
	}

	.goods_wrap {
		background-color: #FFFFFF;

		.goods_info {
			font-size: 36rpx;
			margin-left: 20rpx;

			.goods_price {
				color: #D1372C;
				font-weight: 700;
				margin-bottom: 20rpx;
			}
		}

		image {
			width: 60%;
			margin: 25rpx;
			border-radius: 20rpx;

		}


	}

	.comment_wrap {
		
		margin-top: 20rpx;
		background-color: #FFFFFF;

		.title {
			font-size: 36rpx;
			font-weight: 700;
			margin-left: 20rpx;
			padding-top: 20rpx;
		}

		.comment_info {
			image {
				float: left;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}

			.my {
				display: flex;
				padding: 20rpx;
				border-bottom: 1rpx solid #ebebeb;

				input {
					background-color: #f0f0f0;
					width: 600rpx;
					height: 60rpx;
					margin-left: 20rpx;
					border-radius: 20rpx;
				}
			}

			.comment_list {
				display: flex;
				padding: 20rpx;
				border-bottom: 1rpx solid #ebebeb;
				.info{
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					.commenter_name {
						
						font-size: 32rpx;
					
					}
					.content {
						color: #666;
						font-size: 28rpx;	
					}
				}
				
				.time {
					position: absolute;
					right: 20rpx;
					color: #666;
				}
				.iconfont{
					position: absolute;
					right: 20rpx;
					margin-top: 40rpx;
					color: #666;
					
				}

				
			}
		}

		.see_allmsg {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100rpx;
			font-size: 32rpx;
			color: #d0d0d0;
			font-weight: 700;
		}
	}

	.recommend {
		background-color: #FFFFFF;
		margin-top: 20rpx;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 20rpx;

			.title_name {
				font-size: 36rpx;
				font-weight: 600;

			}

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}


		.goodsList {
			display: flex;
			flex-wrap: wrap;
			background-color: #FFFFFF;
			padding-bottom: 120rpx;
		}
	}

	.btn_tool {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		display: flex;

		.tool_item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			position: relative;

			button {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}

		}

		.btn_sell {
			flex: 2;
			background-color: #ffa500;
			color: #fff;
			font-size: 30rpx;
			font-weight: 600;
		}

		.btn_buy {
			flex: 2;
			background-color: #ff0000;
			color: #fff;
			font-size: 30rpx;
			font-weight: 600;
		}

	}
</style>
