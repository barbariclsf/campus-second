<template>
	<view>
		<button class="btn_login" @click="login">
			<text class="iconfont icon-weixin1"></text>
			<text>授权登录</text>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			login: function() {

				uni.getUserProfile({
					desc: 'weixin',
					lang: 'zh_CN',
					success: (e) => {
						uni.login({
							provider: 'weixin',
							success: (loginRes) => {
								console.log(e)
								this.$post('user/doLogin', {
									code: loginRes.code,
									userAvatar: e.userInfo.avatarUrl,
									userAddress: e.userInfo.province + e.userInfo.city,
									userName: e.userInfo.nickName,
									userSex: e.userInfo.gender,
								}).then(res => {

									if (res.code == 200) {
										if (res.result == 'success') {
											// 预存好相关信息
											this.userInfo = res.data;
											this.session_id = res.sessionId;
											this.$toast('登录成功', 1000, 'success', true);
											uni.setStorageSync('userInfo', res.data);
											uni.setStorageSync('sessionId', res.sessionId);
											uni.setStorageSync('isLogin', true);
											setTimeout(() => {
												uni.navigateBack({
													delta: 1
												})
											}, 1000)
										} else {
											this.$toast('授权登录失败', 1000, 'none', true);
										}
									} else {
										this.$toast(res.message, 1000, 'none', true);
									}
								}).catch(err => {
									console.log(err);
									this.$toast(err, 1000, 'none', true);
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.btn_login {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90%;
		height: 80rpx;
		background-color: #4CD964;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 50rpx;
		margin-top: 50%;

		text {
			margin-left: 10rpx;
		}
	}
</style>
