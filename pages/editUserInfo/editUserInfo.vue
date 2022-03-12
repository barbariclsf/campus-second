<template>
	<view class="user_detail_page">
		<view class="user_info">
			<view class="user_item" style="height: 150rpx;">
				<view class="title">头像</view>
				<image :src="avatar" mode="widthFix"></image>
			</view>

			<view class="user_item">
				<view class="title">姓名</view>
				<input type="text" v-model="userName" />
			</view>

			<view class="user_item">
				<view class="title">出生日期</view>
				<picker mode="date" :value="birthday" start="1970-01-01" @change="bindDateChange">
					<label>{{birthday}}</label>
				</picker>
				<view class="iconfont icon-xuanzeqixiayige"></view>
			</view>

			<view class="user_item">
				<view class="title">性别</view>
				<picker @change="bindSexPickerChange" :range="sexArrays">
					<label>{{sexArrays[sexIndex]}}</label>
				</picker>
				<view class="iconfont icon-xuanzeqixiayige"></view>
			</view>

			<view class="user_item">
				<view class="title">联系电话</view>
				<input type="text" v-model="telephone" />
			</view>

			<view class="user_item">
				<view class="title">地址</view>
				<input type="text" v-model="address" />
			</view>
			<view class="user_item">
				<view class="title">学校</view>
				<input type="text" v-model="schoolName" />
			</view>
			<view class="user_item">
				<view class="title">专业</view>
				<input type="text" v-model="major" />
			</view>
			<view class="user_item">
				<view class="title">班级</view>
				<input type="text" v-model="className" />
			</view>
			<view class="user_item">
				<view class="title">签名</view>
				<input type="text" v-model="sign" />
			</view>
		</view>
		<button class="btn_save" @click="saveUserInfo">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
				sexArrays: ['男', '女'],
				sexIndex: 0,
				birthday: '2021-01-01',
				userName: '',
				telephone: '',
				address: '',
				schoolName: '',
				major: '',
				className: '',
				sign: ''
			}
		},
		onShow() {
			let userInfo = wx.getStorageSync('userInfo');
			if (userInfo != null) {
				this.userName = userInfo.userName;
				this.avatar = userInfo.avatar;
				this.birthday = userInfo.birth;
				this.sexIndex = userInfo.sex;
				this.email = userInfo.email;
				this.telephone = userInfo.telephone;
				this.address = userInfo.address;
				this.schoolName = userInfo.schoolName;
				this.major = userInfo.major;
				this.className = userInfo.className;
				this.sign = userInfo.sign;
			} else {
				this.loadUserData();
			}
		},
		methods: {
			saveUserInfo: function() {
				var userInfo = wx.getStorageSync("userInfo");
				if (userInfo != null) {
					this.$post('user/updateUserInfo', {
						userId: userInfo.userId,
						userName: this.userName,
						birth: this.birthday,
						sex: this.sexIndex,
						telephone: this.telephone,
						address: this.address,
						schoolName: this.schoolName,
						major: this.major,
						className:this.className,
						sign: this.sign
					}).then(res => {
						if (res.code == 200) {
							if (res.result == 'success') {
								console.log(res);
								wx.setStorageSync('userInfo', res.data);
								this.$toast('保存成功', 1000, 'none', true);
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							} else {
								this.$toast('保存失败', 1000, 'none', true);
							}
						} else {
							this.$toast('出错了', 1000, 'none', true);
						}
					}).catch(err => {
						this.$toast('出错了', 1000, 'none', true);
					})
				}
			},
			loadUserData:function(){
				this.$post('user/selectByUserId',{
					userId:uni.getStorageSync('userInfo').userId
				}).then(res => {
						if (res.code == 200) {
							if (res.result == 'success') {
								this.userName = res.data.userName;
								this.avatar = res.data.avatar;
								this.birthday = res.data.birth;
								this.sexIndex = res.data.sex;
								this.email = res.data.email;
								this.telephone = res.data.telephone;
								this.address = res.data.address;
								this.schoolName = res.data.schoolName;
								this.major = res.data.major;
								this.className = res.data.className;
								this.sign = res.data.sign;
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
			bindSexPickerChange(e) {
				this.sexIndex = e.detail.value;
				this.sex = this.sexArrays[this.sexIndex];
			},
			bindDateChange(e) {
				this.birthday = e.detail.value
			},

		}
	}
</script>

<style lang="less">
	page {
		background-color: #f0f0f0;
	}
	.user_info{
		padding-bottom: 90rpx;
		.user_item {
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #F1F1F1;
		
			image {
				width: 15%;
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				border-radius: 50%;
			}
		
			.title {
				font-size: 32rpx;
				padding-top: 20rpx;
				padding-left: 20rpx;
			}
		
			input {
				padding: 20rpx;
				width: 100%;
			}
		
			picker {
				padding: 20rpx;
		
			}
		
			.icon-xuanzeqixiayige {
				position: absolute;
				right: 20rpx;
				margin-top: -50rpx;
			}
		}
	}
	
	.btn_save {
		background-color: #55aaff;
		position: fixed;
		width: 95%;
		margin-left: 20rpx;
		bottom: 10rpx;
		color: #FFFFFF;
		font-size: 36rpx;
	}
</style>
