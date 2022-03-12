<template>
	<view class="tabs">
		<view class="tabs_title">
			<view class="title_item " :class="item.isActive?'active':''" v-for="(item,index) in tabs" :key="index" @click="handleItemTap(index)">
				{{item.value}}
			</view>
		</view>
		<view class="tabs_content">
			<slot></slot>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				value: []
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleItemTap(index) {
				this.$emit("tabItemChange", index);
			}
		},
		

	}
</script>

<style lang="less">
	.tabs{
		background-color: #FFFFFF;
		
	}
	.tabs_title {
		display: flex;
		height: 100rpx;
		
	}

	.title_item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 15rpx 0;
		font-size: 36rpx;
	}

	.active {
		color: #D1372C;
		border-bottom: 3rpx solid #D1372C;
	}
</style>
