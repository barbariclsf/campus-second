<template>
	<tabs :tabs="tabs" @tabItemChange="handleTabItemChange">
		<block v-if="tabs[0].isActive">
			<row-goods-card v-for="(item,index) in publicGoodsList" :key="index" :goodsId="item.goods.goodsId" :userId="item.goods.userId"
			 :goodsUrl="item.imgList[0].goodsImg" :description="item.goods.description" :nowPrice="item.goods.nowPrice"
			 :publicDate="item.goods.publicDate"
			 :operation="0"
			 @deleteGoods="deleteGoods"
			 @updateGoods="updateGoods"></row-goods-card>
			 
		</block>
		<block v-else-if="tabs[1].isActive">
			<order-card v-for="(item,index) in sellGoodsList" :key="index" :goodsId="item.goods.goodsId" :userId="item.goods.userId"
			 :goodsUrl="item.imgList[0].goodsImg" :description="item.goods.description" :nowPrice="item.goods.nowPrice"
			 :publicDate="item.goods.publicDate" :userAvatar="item.user.avatar" :userName="item.user.userName" :orderDate="item.order.orderDate"></order-card>
		</block>
		<block v-else-if="tabs[2].isActive">
			<order-card v-for="(item,index) in buyGoodsList" :key="index" :goodsId="item.goods.goodsId" :userId="item.goods.userId"
			 :goodsUrl="item.imgList[0].goodsImg" :description="item.goods.description" :nowPrice="item.goods.nowPrice"
			 :publicDate="item.goods.publicDate" :userAvatar="item.user.avatar" :userName="item.user.userName" :orderDate="item.order.orderDate"></order-card>
		</block>
		<block v-else-if="tabs[3].isActive">
			<row-goods-card v-for="(item,index) in collectGoodsList" :key="index" :goodsId="item.goods.goodsId" :userId="item.goods.userId"
			 :goodsUrl="item.imgList[0].goodsImg" :description="item.goods.description" :nowPrice="item.goods.nowPrice"
			 :publicDate="item.goods.publicDate"
			 ></row-goods-card>
		</block>
	</tabs>
</template>

<script>
	import tabs from '@/components/tabs.vue';
	import rowGoodsCard from '@/components/rowGoodsCard.vue'
	import orderCard from '@/components/orderCard.vue'
	export default {
		components: {
			tabs,
			rowGoodsCard,
			orderCard
		},
		data() {
			return {
				tabs: [{
						id: 0,
						value: "我发布的",
						isActive: false
					},
					{
						id: 1,
						value: "我卖出的",
						isActive: false
					},
					{
						id: 2,
						value: "我买到的",
						isActive: false
					},
					{
						id: 3,
						value: "我收藏的",
						isActive: false
					}
				],
				publicGoodsList: [],
				collectGoodsList:[],
				sellGoodsList:[],
				buyGoodsList:[]
			}

		},
		onLoad(option) {
			
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
				this.tabs[option.id].isActive = true;
				
				if(option.id == '0'){
					this.loadPublicGoodsListData();
				}else if(option.id == '1'){
					this.loadSellGoodsListData();
				}else if(option.id == '2'){
					this.loadBuyGoodsListData();
				}else{
					this.loadCollectGoodsListData();
				}
			}
		},
		methods: {
			loadBuyGoodsListData:function(){
				this.$post('order/selectByPayerId', {
					payerId: uni.getStorageSync('userInfo').userId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log("buy")
							console.log( res);
							this.buyGoodsList = res.data;
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
			loadSellGoodsListData:function(){
				this.$post('order/selectByPublicerId', {
					publicerId: uni.getStorageSync('userInfo').userId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log("sell")
							console.log(res);
							this.sellGoodsList = res.data;
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
			updateGoods:function(goodsId){
				
				uni.navigateTo({
					url:'../editGoods/editGoods?goodsId=' + goodsId
				})
			},
			deleteGoods:function(goodsId){
				this.$post('goods/deleteGoods', {
					goodsId: goodsId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							this.publicGoodsList.forEach((v,i) => {
								if(v.goods.goodsId == goodsId){
									this.publicGoodsList.splice(i,1);
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
			loadPublicGoodsListData: function() {
				
				this.$post('goods/selectByUserId', {
					userId: uni.getStorageSync('userInfo').userId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							
							console.log(res);
							this.publicGoodsList = res.data;
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
			loadCollectGoodsListData:function(){
				this.$post('collect/selectByUserId', {
					userId: uni.getStorageSync('userInfo').userId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							
							console.log(res);
							this.collectGoodsList = res.data;
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
			handleTabItemChange(index) {
				
				let oldTabs = this.tabs;
				oldTabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
				this.tabs = oldTabs;
				if(index == '0'){
					this.loadPublicGoodsListData();
				}else if(index == '1'){
					this.loadSellGoodsListData();
				}else if(index == '2'){
					
					this.loadBuyGoodsListData();
				}else{
					
					this.loadCollectGoodsListData();
				}

			}
		}


	}
</script>

<style lang="less">

</style>
