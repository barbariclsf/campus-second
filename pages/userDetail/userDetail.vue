<template>
	<view class="user_detail_wrap">
		<view class="bg_img">
			<image :src="userInfo.avatar"></image>
		</view>
		<view class="user_detail">
			<view class="user_info">
				<image :src="userInfo.avatar" mode="widthFix"></image>
				<button class="edit_btn" v-show="userInfo.userId == userId" @click="editUserInfo">编辑</button>
				<view class="user_name">L</view>
				<view class="sex">
					<view class="iconfont icon-nvsheng"></view>
					<view class="sex_type" v-if="userInfo.sex == 0">男</view>
					<view class="sex_type" v-if="userInfo.sex == 1">女</view>
				</view>
				<view class="sign">
					<view class="iconfont icon-qianming"></view>
					<view class="sign_content">{{ userInfo.sign }}</view>
				</view>
				<view class="education_info">
					<view class="iconfont icon-banji"></view>
					<view class="major">{{ userInfo.major }}</view>
					<view>{{ userInfo.className }}</view>
				</view>
				
			</view>
			<view class="goods_info">
				<view class="title">发布的物品</view>
				<view class="goods_list"> 
					<column-goods-card v-for="(item,index) in goodsList" :key="index"
								:goodsId="item.goods.goodsId"
								:goodsUrl="item.imgList[0].goodsImg"
								:description="item.goods.description"
								:nowPrice="item.goods.nowPrice"
								:oldPrice="item.goods.oldPrice"
								:label="item.goods.label"
								:grade="item.goods.grade"
								:publicDate="item.goods.publicDate">
					</column-goods-card>
				</view>
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
				userInfo:{},
				goodsList:[],
				userId:''
			}
		},
		onLoad(option){
			if(option != ''){
				this.loadUserInfo(option.userId);
			}else{
				this.userInfo = uni.getStorageSync('userInfo')
			}
			this.userId = uni.getStorageSync("userInfo").userId;
			this.loadGoodsDate();
		},
		methods: {
			loadUserInfo:function(userId){
				this.$post('user/selectByUserId',{
					userId:uni.getStorageSync('userInfo').userId
				}).then(res => {
						if (res.code == 200) {
							if (res.result == 'success') {
								console.log(res);
								this.userInfo = res.data;
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
			loadGoodsDate:function(){
				this.$post('goods/selectByUserId', {
					userId: uni.getStorageSync('userInfo').userId
				}).then(res => {
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
			},
			editUserInfo:function(){
				uni.navigateTo({
					url:'../editUserInfo/editUserInfo'
				})
			}
		}
	}
</script>

<style lang="less">
	
	.user_detail_wrap{
		
		position: relative;
		image{
			height: 250rpx;
		}
		.user_detail{
			background-color: #FFFFFF;
			position: absolute;
			transform: translate(-50%);
			border-radius: ;
			top: 220rpx;
			left: 50%;
			width: 100%;
			border-radius: 20rpx 20rpx 0 0;
			.user_info{
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				image{
					width: 20%;
					border-radius: 50%;
					margin-top: -80rpx;
				}
				button{
					position: absolute;
					right: 20rpx;
					margin-top: 20rpx;
					width: 200rpx;
					height: 70rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #FFD700;
					font-size: 32rpx;
					color: #FFFFFF;
					border-radius: 50rpx;
				}
				.user_name{
					font-size: 36rpx;
					font-weight: 600;
					margin-left: 30rpx;
				}
				.iconfont{
					color: #666;
				}
				.sex{
					display: flex;
					margin-top: 10rpx;
					color:#666;
					.sex_type{
						margin:0 20rpx;
					}
				}
				.sign{
					display: flex;
					margin-top: 10rpx;
					.sign_content{
						margin-left: 30rpx;
						color: #666;
					}
				}
				.education_info{
					display: flex;
					margin-top: 10rpx;
					color: #666;
					.major{
						margin: 0 20rpx;
					}
				}
			}
		}
		.goods_info{
			margin-top: 30rpx;
			
			.title{
				font-size: 32rpx;
				margin-left: 30rpx;
				
			}
			.goods_list{
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
	
</style>
