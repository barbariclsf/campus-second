<template>
	<tabs :tabs="tabs" @tabItemChange="handleTabItemChange">
		<block v-if="tabs[0].isActive">
			<order-card v-for="(item,index) in ordersList" :key="index" :goodsId="item.goods.goodsId" :userId="item.goods.userId"
			 :goodsUrl="item.imgList[0].goodsImg" :description="item.goods.description" :nowPrice="item.goods.nowPrice"
			 :publicDate="item.goods.publicDate" :userAvatar="item.user.avatar" :userName="item.user.userName" :orderDate="item.order.orderDate"></order-card>
		</block>
		<block v-else-if="tabs[1].isActive">
			<order-card v-for="(item,index) in ordersList" :key="index" :goodsId="item.goods.goodsId" :userId="item.goods.userId"
			 :goodsUrl="item.imgList[0].goodsImg" :description="item.goods.description" :nowPrice="item.goods.nowPrice"
			 :publicDate="item.goods.publicDate" :userAvatar="item.user.avatar" :userName="item.user.userName" :orderDate="item.order.orderDate"></order-card>
		</block>
		<block v-else-if="tabs[2].isActive">
			
		</block>
		<block v-else-if="tabs[3].isActive">
			
		</block>
	</tabs>
</template>

<script>
	import tabs from '@/components/tabs.vue';
	import orderCard from '@/components/orderCard.vue'
	export default {
		components: {
			tabs,
			orderCard
		},
		data() {
			return {
				tabs: [{
						id: 0,
						value: "所有订单",
						isActive: false
					},
					{
						id: 1,
						value: "已付款",
						isActive: false
					},
					{
						id: 2,
						value: "待付款",
						isActive: false
					},
					{
						id: 3,
						value: "退款",
						isActive: false
					}
				],
				ordersList: []
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
					console.log(option.id)
				this.tabs[option.id].isActive = true;
			
				if(option.id == '0'){
					this.loadData();
				}else if(option.id == '1'){
					this.loadData();
				}else{
					
				}
			}

		},
		methods: {
			loadData: function() {
				this.$post('order/selectByPayerId', {
					payerId: uni.getStorageSync('userInfo').userId
				}).then(res => {
					if (res.code == 200) {
						if (res.result == 'success') {
							console.log(res);
							this.ordersList = res.data;
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
				console.log(index)
				let oldTabs = this.tabs;
				oldTabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
				this.tabs = oldTabs;
				if(index == '0'){
					this.loadData();
				}else if(index == '1') {
					this.loadData()
				}else{
					
				}
			}
		}
	}
</script>

<style lang="less">

</style>
