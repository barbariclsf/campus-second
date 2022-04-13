<template>
	<view class="search_page">
		<view class="search_input">
		
				<input type="text" v-model="searchContent" confirm-type="search" @confirm="doSearch">
		</view>
		<sl-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result"></sl-filter>
		

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

	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import columnGoodsCard from '@/components/columnGoodsCard.vue';
	export default {
		components: {
			slFilter,
			columnGoodsCard
		},
		data() {
			return {
				goodsList:[],
				searchContent: '',
				themeColor: '#FFD700',
				titleColor: '#666666',
				filterResult: '',
				menuList: [{
						'title': '排序',
						'isMutiple': false,
						'key': 'priceSort',
				
						'detailList': [{
								'title': '综合排序',
								'value': ''
							},
							{
								'title': '价格降序',
								'value': '价格降序'
							},
							{
								'title': '价格升序',
								'value': '价格升序'
							},
				
						]
				
					},
					{
						'title': '价格',
						'key': 'price',
						'isMutiple': false,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '0~2000',
								'value': '0~2000'
							},
							{
								'title': '2000~3000',
								'value': '2000~3000'
							},
							{
								'title': '3000~4000',
								'value': '3000~4000'
							},
							{
								'title': '4000~5000',
								'value': '4000~5000'
							},
						]
				
					},
					{
						'title': '等级',
						'key': 'grade',
						'isMutiple': false,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '99成新',
								'value': '99成新'
							},
							{
								'title': '9成新',
								'value': '9新'
							},
							{
								'title': '8成新',
								'value': '8成新'
							},
				
						]
					}
				]
			}
		},
		onLoad() {
		
		},
		methods: {
			doSearch: function() {
				this.$post('search', {
					searchContent: this.searchContent
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							this.goodsList = res.data;
							uni.setStorageSync('sortGoodsList', res.data);
							this.$toast('查询成功', 1000, 'none', true);
			
						} else {
							this.$toast('查询失败', 1000, 'none', true);
						}
					} else {
						this.$toast('出错了', 1000, 'none', true);
					}
				}).catch(err => {
					this.$toast('出错了', 1000, 'none', true);
				})
			
			
			},
			result(val) {
				var type = val.type;
				var value = val.value;
				var index = this.menuList.findIndex(v => v.title == type);
				if (index == 0) {
					console.log(val)
					let goodsList = uni.getStorageSync('sortGoodsList');
					if(value == '价格降序')	{
						goodsList.sort(this.compare2("nowPrice"));
					}else if(value == '价格升序'){
						goodsList.sort(this.compare1("nowPrice"));
					}
					this.goodsList = goodsList;
				}else if(index == 1){
					let arr =  value.split('~')
					var low = arr[0];
					var high = arr[1];
					let goodsList = [];
					uni.getStorageSync('sortGoodsList').forEach(v => {
						if(v.goods.nowPrice >= low && v.goods.nowPrice <= high){
							goodsList.push(v);
						}
					});
					this.goodsList = goodsList;
					
				}else{
					let goodsList = [];
					uni.getStorageSync('sortGoodsList').forEach(v => {
						if(v.goods.grade == value){
							goodsList.push(v);
						}
					});
					this.goodsList = goodsList;
				}
			},
			compare1: function(attr) {
				
				return function(a, b) {
					var val1 = a.goods.nowPrice;
					var val2 = b.goods.nowPrice;
					return val1 - val2;
				}
			},
			compare2: function(attr) {
				return function(a, b) {
					var val1 = a.goods.nowPrice;
					var val2 = b.goods.nowPrice;
					return val2 - val1;
				}
			}
			
		}
	}
</script>
<style lang="less">
	.search_input {
	
		height: 90rpx;
		padding: 10rpx;
	
	}
	
	.search_input input {
		height: 100%;
		display: flex;
		
		background-color: #fff;
		border-radius: 15rpx;
	}
	.goods_list{
		display: flex;
		flex-wrap: wrap;
	}
</style>
