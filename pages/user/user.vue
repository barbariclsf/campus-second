<template>
	<view class="user_apge">
		<view class="user_info_wrap" >
			<view class="user_img_wrap" v-show="isLogin">
				<image class="user_big" :src="userInfo.avatar"></image>
				<navigator class="user_info" url="../userDetail/userDetail?userId=0" hover-class="none" >
					<image class="user_icon" :src="userInfo.avatar"></image>
					<view class="user_name"> {{ userInfo.userName }}</view>
				</navigator>
			</view>
			
			<view class="user_img_wrap" v-show="!isLogin" >
				<!-- <image class="user_big" src="../../static/user.jpg"></image> -->
				<view class="user_info">
					<image class="user_icon" src="../../static/unlogin.png"></image>
					<button class="login_btn" @click="toLogin">立即登录</button>
				</view>
			</view>
			
			
		</view>
		
		<view class="user_content">
			<view class="user_main">
				<view class="history_wrap">
					<navigator url="/pages/myGoods/myGoods?id=0" hover-class="none" >
						<view class="his_num">{{ publicNum }}</view>
						<view class="his_name">我发布的</view>
					</navigator>
					<navigator  url="/pages/myGoods/myGoods?id=1" hover-class="none" >
						<view class="his_num">{{ sellNum }}</view>
						<view class="his_name">我卖出的</view>
					</navigator>
					<navigator  url="/pages/myGoods/myGoods?id=2" hover-class="none" >
						<view class="his_num">{{ buyNUm }}</view>
						<view class="his_name">我买到的</view>
					</navigator>
					<navigator  url="/pages/myGoods/myGoods?id=3" hover-class="none" >
						<view class="his_num">{{ collectNum }}</view>
						<view class="his_name">我收藏的</view>
					</navigator>

				</view>
				<view class="orders_wrap">
					<view class="orders_title">我的订单</view>
					<view class="order_content">
						<navigator url="/pages/order/order?id=0" hover-class="none" >
							<view class="iconfont icon-quanbudingdan"></view>
							<view class="order_name">全部订单</view>
						</navigator>
						<navigator url="/pages/order/order?id=1" hover-class="none" >
							<view class="iconfont icon-yifukuan"></view>
							<view class="order_name">已付款</view>
						</navigator>
						<navigator url="/pages/order/order?id=2" hover-class="none" >
							<view class="iconfont icon-daifukuan"></view>
							<view class="order_name">待付款</view>
						</navigator>
						<navigator url="/pages/order/order?id=3" hover-class="none">
							<view class="iconfont icon-icon"></view>
							<view class="order_name">退款/退货</view>
						</navigator>
					</view>
				</view>
				
				<view class="app_info_wrap">
					<view class="app_info_item app_info_contact">
						<text>联系客服</text>
						<button open-type="contact"></button>
					</view>
					<navigator url="/pages/feedback/feedback" class="app_info_item">意见反馈</navigator>
				
					<view class="app_info_item" @click="loginOut">退出登录</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				isLogin:false,
				publicNum:'-',
				sellNum:'-',
				buyNUm:'-',
				collectNum:'-',
				
			}
		},
		onShow(){
			if (uni.getStorageSync('isLogin') != '') {
				
				this.isLogin = uni.getStorageSync('isLogin');
				this.userInfo = uni.getStorageSync('userInfo');
				this.loadData();
			}
			
		},
		methods: {
			loginOut: function() {
				if(this.isLogin == false){
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
					this.isLogin = false;
					uni.clearStorageSync();
					this.$toast("退出登录成功", 1000, 'none', true);
				}
				
			},
			
			loadData:function(){
				this.$post('user/selectByUserId',{
					userId:uni.getStorageSync('userInfo').userId
				}).then(res => {
						if (res.code == 200) {
							if (res.result == 'success') {
								console.log(res);
								this.publicNum = res.arrayList[0];
								this.sellNum = res.arrayList[1];
								this.buyNUm = res.arrayList[2];
								this.collectNum = res.arrayList[3];
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
			toLogin:function(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="less">

.user_info_wrap {
    height: 40vh;
    overflow: hidden;
    background-color: #FFD700;
    position: relative;
	
    .user_img_wrap {
        position: relative;
      .user_big {
        height: 50vh;
        filter: blur(10rpx);
      }
  
      .user_info {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 20%;
        text-align: center;
        .user_icon {
            width: 150rpx;
            height: 150rpx;
            border-radius: 50%;
        }
        .user_name {
            color: #fff;
            margin-top: 30rpx;
            // font-size: 40rpx;
        }
      }
    }
    .user_btn{
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 40%;
        border: 1rpx solid greenyellow;
        font-size: 38rpx;
        padding: 30rpx;
        border-radius: 10rpx;
    }
	.login_btn{
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60rpx;
		font-size: 26rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		
	}
  }
  .user_content{
    position: relative;
    .user_main{
        color: #666;
        padding-bottom: 40rpx;
        position: absolute;
        width: 90%;
        left: 50%;
        transform: translate(-50%);
        top: -50rpx;

    .history_wrap{
        padding: 20rpx 0;
        background-color: #fff;
        display: flex;
		
        navigator{
            flex: 1;
            text-align: center;
            .his_num{
                color: #FFD700;
            }
        } 
    }
    .orders_wrap{
        background-color: #fff;
        margin-top: 30rpx;

        .orders_title{
            padding: 20rpx;
            border-bottom: 1rpx solid #ccc;
        }
        .order_content{
            display: flex;
            navigator{
                padding: 20rpx 0;
                flex: 1;
                text-align: center;
                .iconfont{
                    color:#FFD700;
                    font-size: 40rpx;
                }
                .order_name{}
            }
        }


    }
    }
    
    .app_info_wrap{
        margin-top: 30rpx;
        background-color: #fff;
        .app_info_item{
            padding: 30rpx;
            border-bottom: 2rpx solid #ccc;
        }
        .app_info_contact{
            display: flex;
            justify-content: space-between;
        }
		button {
			width: 80%;
			opacity: 0;
		}


    }
    
     
  }
</style>
