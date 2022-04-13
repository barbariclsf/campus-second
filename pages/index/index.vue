<template>
	<view class="sc_index">
		<!-- 搜索 -->
		<view class="search_input">
			<navigator class="" target="" url="/pages/search/search" hover-class="navigator-hover" open-type="navigate">
				搜索
			</navigator>
		</view>

		<!-- 轮播 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image src="http://r9ghgu7sm.hn-bkt.clouddn.com/997640474298c2b5be4d5448f9fcf690.jpeg" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="http://r9ghgu7sm.hn-bkt.clouddn.com/997640474298c2b5be4d5448f9fcf690.jpeg" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<!-- 分类 -->
		<view class="index_cates">
			<navigator :url="'/pages/goodList/goodList?sortId=' + item.id" v-for="(item,index) in cates" :key="index">
				<image :src="item.src" mode="widthFix"></image>
				<text>{{ item.value }}</text>
			</navigator>
		</view>

		<!-- 导航栏 -->
		<scroll-view scroll-x class="nav-tab-wrap" :throttle="false" @scroll="scrollEvent" :fadingEdge="none">
			<view class="nav-tab">
				<block v-for="(item,index) in tabList" :key="index">
					<view class="nav-tab-item" :class="{'active':currentIndex==index}" @tap="changeTab(index)">{{item}}</view>
				</block>
				<view class="underline" :style="'left:'+ left +'px;width:'+ width +'px;'"></view>
			</view>
		</scroll-view>
		
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

</template>

<script>
	import columnGoodsCard from '@/components/columnGoodsCard.vue';
	export default {
		components: {
			columnGoodsCard
		},
		data() {
			return {
				cates: [],
				currentIndex: 0, //当前选中的索引值
				tabList: ["推荐"],
				left: uni.upx2px(20), //滑动条左边距离
				width: uni.upx2px(40), //滑动条宽度
				scrollX: 0, //滚动条的位置
				space: uni.upx2px(20), //滑动条和item的左右间距
				goodsList:[],

			}
		},
		onLoad() {

		},
		mounted() {
			
			this.changeTab(0);
			this.loadCatesData();
			this.loadGoodsData(0);
			
		},
		methods: {
			changeTab:function(num) {
				var that = this;
				that.currentIndex = num;
				let selectorQuery = uni.createSelectorQuery().in(that);
				selectorQuery.selectAll('.nav-tab-item').boundingClientRect(function(data) {
					// data 为当前选中tab的节点信息
					that.left = data[num].left + that.scrollX + that.space;
					that.width = data[num].width - that.space * 2;
				}).exec();
				var sortId = that.currentIndex;
				if(sortId == 0){
					this.loadGoodsData();
				}else{
					this.$post('goods/selectBySortId',{
						sortId:sortId
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
					
				}
				
				
			},
			scrollEvent(e) {
				this.scrollX = e.detail.scrollLeft;
				
			},
			loadGoodsData:function(){
				this.$get('goods/selectAll'
					).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							
							console.log(res);
							this.goodsList = res.data;
							uni.setStorageSync('goodsList',this.goodsList);
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
			loadCatesData:function(){
				this.$get('sort/selectAll'
					).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log(res);
							this.cates = [];
							this.tabList = ["推荐"];
							res.data.forEach(v => {
								this.cates.push({"id" : v.id,"value" : v.sortName,"src":v.sortLogo})
								this.tabList.push(v.sortName);
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
			
		}

	}
</script>

<style lang="less">
	.search_input {

		height: 90rpx;
		padding: 10rpx;

	}

	.search_input navigator {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border-radius: 15rpx;
	}

	 swiper {
		width: 750rpx;
		height: 320rpx;

		image {
			width: 100%;
		}
	}

	.index_cates {

		background-color: #FFFFFF;
		width: 100%;
		height: 300rpx;
		margin-top: 15rpx;

		navigator {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;
			width: 20%;
			float: left;
			padding: 20rpx 0;

			image {
				width: 50%;
				height: 100rpx;

			}
		}

	}

	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.nav-tab-wrap {

		width: 100%;
		height: 80rpx;
		white-space: nowrap;

		.nav-tab {
			position: relative;

			.nav-tab-item {
				margin-right: 60rpx;
				line-height: 80rpx;
				display: inline-block;
				color: #333333;
				font-weight: bold;
				font-size: 30rpx;

				&:nth-of-type(1) {
					margin-left: 20rpx;
				}

				&.active {
					color: #FF6100;
				}
			}

			.underline {
				position: absolute;
				width: 60rpx;
				height: 5rpx;
				background-color: #FF6100;
				left: 20rpx;
				bottom: 0;
				transition: 0.3s;
			}
		}
	}
	.goods_list{
		display: flex;
		flex-wrap: wrap;
	}
	
</style>
