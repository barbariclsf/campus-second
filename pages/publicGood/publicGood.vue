<template>
	<view class="fb_page">

		<view class="fb_content">

			<rich-text-editor :value="description" v-model="description"></rich-text-editor>
			<view class="fb_tool">
				<button @click="handleChooseImg">+</button>
				<view class="up_img_item" v-for="(item,index) in chooseImages" :key="index" @click="handleRemoveImg(index)">
					<upImg :src="item"></upImg>
				</view>
			</view>
		</view>
		<view class="tools">
			<view class="tool_item">
				<text class="iconfont icon-icon_category"></text>
				<text>分类</text>
				<picker @change="bindSortPickerChange" :range="sortArrays">
					<label>{{sortArrays[sortIndex]}}</label>
				</picker>
			</view>
			<view class="tool_item">
				<text class="iconfont icon-jiage"></text>
				<text>原价</text>
				<input type="number" v-model="oldPrice" />
			</view>
			<view class="tool_item">
				<text class="iconfont icon-jiage"></text>
				<text>现价</text>
				<input type="number" v-model="nowPrice" />
			</view>
			<view class="tool_item">
				<text class="iconfont icon-dengji"></text>
				<text>等级</text>
				<picker @change="bindRankPickerChange" :range="rankArrays">
					<label>{{rankArrays[rankIndex]}}</label>
				</picker>
			</view>
			<view class="tool_item">
				<text class="iconfont icon-biaoqian"></text>
				<text>标签</text>
				<picker @change="bindLabelPickerChange" :range="labelArrays">
					<label>{{labelArrays[labelIndex]}}</label>
				</picker>
			</view>
		</view>
		<button class="submitBtn" @click="addGoods">发布</button>

	</view>
</template>

<script>
	import upImg from '@/components/upImg.vue';
	import richTextEditor from '@/components/richTextEditor.vue'
	export default {
		components: {
			upImg,
			richTextEditor
		},
		data() {
			return {
				chooseImages: [],
				sortArrays: ['请选择'],
				sortIndex: 1,
				oldPrice: 0,
				nowPrice: 0,
				rank: "",
				title: "",
				rankArrays: ['请选择', '99成新', '9成新','8成新'],
				rankIndex: 1,
				labelArrays: ['请选择', '急出', '长期'],
				labelIndex: 1,
				description: '',
				label: '99成新',
				grade: '急出',



			}
		},
		onShow() {
			this.loadSortData();

		},
		methods: {
			loadSortData: function() {
				this.$get('sort/selectAll').then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log(res);

							this.sortArrays = ['请选择'],
								res.data.forEach(v => {
									this.sortArrays.push(v.sortName);
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
			addGoods: function() {
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
					this.$post('goods/addGoods', {
						userId: uni.getStorageSync('userInfo').userId,
						sortId: this.sortIndex,
						oldPrice: this.oldPrice,
						nowPrice: this.nowPrice,
						description: this.description,
						grade: this.grade,
						label: this.label
					}).then(res => {
						if (res.code == 200) {
							if (res.result == 'success') {
								this.$loading('上传中', true);
								this.uploadImg(res.data.goodsId);
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
			uploadImg: function(goodsId) {
				if (this.chooseImages.length != 0) {
					this.chooseImages.forEach((v, i) => {
						uni.uploadFile({
							filePath: v,
							name: 'file',
							url: 'http://192.168.0.104:8080/upload/uploadImg',
							header: {
								Authorization: uni.getStorageSync("sessionId")
							},
							formData: {
								goodsId: goodsId
							},
							success: (res) => {
								let data = JSON.parse(res.data);
								if (data.code == 200 && data.result == 'success') {

									if (i == this.chooseImages.length - 1) {
										//置空
										this.chooseImages = [];
										this.nowPrice = 0;
										this.oldPrice = 0;
										this.labelIndex = 0;
										this.label = '';
										this.sortIndex = 0;
										this.description = '';
										this.rankIndex = 0;
										this.grade = '';
										//返回上一页面
										this.$toast('上传成功', 1000, 'success', true);
										setTimeout(() => {
											uni.redirectTo({
												url: '../goodDetail/goodDetail?goodsId=' + goodsId + '&userId=' + uni.getStorageSync('userInfo').userId
											})
										}, 1000)
									}
								} else {
									this.$toast('出错了', 1000, 'none', true);
								}

							}
						})
					})
				} else {
					console.log("只提交文本 ")
				}
			},
			handleTextInput(e) {
				this.textVal = e.detail.value;
				console.log(this.textVal);
			},
			handleChooseImg() {
				if (this.chooseImages.length > 3) {
					uni.showToast({
						title: '最多只能上传四张张',
						icon: 'none',
						mask: true
					})
				} else {
					wx.chooseImage({
						count: 9,
						sizeType: ['original', 'compressed'],
						sourceType: ['album', 'camera'],
						success: (res) => {
							this.chooseImages = [...this.chooseImages, ...res.tempFilePaths];
						}
					})
				}

			},
			handleRemoveImg(index) {

				let chooseImages = this.chooseImages;
				chooseImages.splice(index, 1);
				this.chooseImages = chooseImages;
			},
			bindSortPickerChange(e) {
				this.sortIndex = e.detail.value;
			},
			bindRankPickerChange(e) {
				this.rankIndex = e.detail.value;
				this.grade = this.rankArrays[this.rankIndex];
			},
			bindLabelPickerChange(e) {
				this.labelIndex = e.detail.value;
				this.label = this.labelArrays[this.labelIndex];
			}

		}
	}
</script>

<style lang="less">
	.fb_content {
		background-color: #fff;

		rich-text-editor {
			width: 100%;
			font-size: 28rpx;
		}

		.fb_tool {
			display: flex;
			padding-top: 300rpx;
			padding-bottom: 30rpx;
			flex-wrap: wrap;

			button {
				margin: 0;
				width: 120rpx;
				height: 120rpx;
				font-size: 60rpx;
				padding: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 20rpx;
				margin-top: 20rpx;
				color: #ccc;

			}

			.up_img_item {
				margin-left: 20rpx;
				margin-top: 20rpx;
			}

		}
	}

	.tools {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		color: #666;

		.tool_item {
			font-size: 32rpx;
			height: 100rpx;
			position: relative;
			border-bottom: 1rpx solid #e6e6e6;
			justify-content: center;

			text {
				margin-left: 20rpx;
				margin-top: 30rpx;
				float: left;
			}

			picker {
				position: absolute;
				right: 20rpx;
				margin-top: 30rpx;
			}

			input {
				position: absolute;
				right: 20rpx;
				margin-top: 30rpx;
				text-align: right;
			}
		}

	}

	.submitBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80%;
		height: 80rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;
		background-color: #f5cc00;
		color: #FFFFFF;

	}
</style>
