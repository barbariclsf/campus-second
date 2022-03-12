<template>
	<view class="feed_back_page">
		<view class="feed_back_info">
			<view class="feed_back_item">请选择反馈问题的类型</view>
			<view class="feed_back_item" v-for="(item,index) in itemCheck" :key="index">
				<view class="title">{{ item.value }}</view>
				<view class="check " :class="item.isActive ? 'active':''" @click="handleChick(index)"></view>
			</view>

			<view class="description">
				<view class="title">描述问题</view>
				<textarea v-model="textVal" placeholder="请描述问题" />
				</view>
		</view>
		<button class="submit_btn" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemCheck:[
					{
						id:0,
						value:'功能问题',
						isActive:false
					},
					{
						id:1,
						value:'订单问题',
						isActive:false
					},
					{
						id:2,
						value:'其他问题',
						isActive:false
					}
				],
				textVal:'',
				itemVal:''
			}
		},
		methods: {
			submit:function(){
				
				if (this.textVal.trim() == '' || this.itemVal == '') {
				    uni.showToast({
				    	title: '未选择类型或输入内容为空',
				    	icon: 'none',
				    	 mask: true
				    })
				 }else{
					 this.$post('feedback/insertFeedback', {
					 	userId: uni.getStorageSync('userInfo').userId,
					 	type:this.itemVal,
					 	content:this.textVal
					 }).then(res => {
					 	if (res.code == 200) {
					 		if (res.result == 'success') {
					 			this.$toast(res.message, 1000, 'none', true);
					 			setTimeout(() => {
					 				uni.navigateBack({
					 					delta: 1
					 				})
					 			}, 1000)
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
			handleChick:function(index){
				this.itemCheck.forEach((v, i) => {
					if(i == index){
						v.isActive = true;
						this.itemVal = v.value;
					}else{
						v.isActive = false;
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.feed_back_info{
		background-color: #FFFFFF;
		.feed_back_item{
			width: 100%;
			display: flex;
			padding: 20rpx;
			border-bottom: 1rpx solid #f3f3f3;
			font-size: 32rpx;
		}
		.check{
			position: absolute;
			right: 20rpx;
			margin-top: -5rpx;
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			border: 1rpx solid #e6e6e6;
		}
		.active{
			
			background-color: #C0C0C0;
		}
		.description{
			.title{
				padding: 20rpx;
				font-size: 32rpx;
				border-bottom: 1rpx solid #f3f3f3;
			}
			textarea{
				padding: 20rpx;
				width: 90%;
				color: #666;
			}
		}
		
	}
	.submit_btn{
		width: 80%;
		height: 80rpx;
		border-radius: 50rpx;
		margin-top: 40rpx;
		background-color: #00d000;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
