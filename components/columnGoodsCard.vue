<template>
	<view class="goods_info_wrap">
		<navigator  class="goods" :url="'/pages/goodDetail/goodDetail?goodsId=' + goodsId + '&userId=' + userId ">
				<image :src="goodsUrl"></image>
				<view class="goods_label">
					<view>{{ label }}</view>
					<view>到手价￥{{ nowPrice }}</view>
				</view>
				<rich-text class="goods_name" :nodes="description"></rich-text>
				<view class="goods_nowPrice">￥{{ oldPrice }} 到手价</view>
				<view class="goods_beforePrice">￥{{ nowPrice }}</view>
			
		</navigator>


	</view>

</template>

<script>
	import richTextEditor from "@/components/richTextEditor.vue"
	export default {
		components: {
			richTextEditor
		},
		props: {
			goodsId: {
				type: Number,
				value: 0
			},
			userId: {
				type: Number,
				value: 0
			},
			goodsUrl: {
				type: String,
				value: ''
			},
			description: {
				type: String,
				value: ''
			},
			nowPrice: {
				type: Number,
				value: 0
			},
			oldPrice: {
				type: Number,
				value: 0
			},
			label: {
				type: String,
				value: ''
			},
			grade: {
				type: String,
				value: ''
			},
			publicDate: {
				type: String,
				value: ''
			},

		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.goods {
		margin-top: 20rpx;
		margin-left: 30rpx;
		width: 44vw;
		background-color: #FFFFFF;

		image {
			width: 100%;
			height: 350rpx;
			border-radius: 15rpx;
		}

		.goods_label {
			position: relative;
			display: flex;
			justify-content: space-between;
			margin-top: -40rpx;
			padding: 0 15rpx;
			width: 100%;
			height: 40rpx;
			background-color: #ffba75;
			color: #FF6100;
			border-radius: 0 0 15rpx 15rpx;
		}

		.goods_name {
			padding: 0 15rpx;
			font-size: 32rpx;
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;


		}

		.goods_describe {
			padding: 10rpx 15rpx;
			color: #666;
		}

		.goods_nowPrice {
			padding: 10rpx 15rpx;
			color: #DD524D;
			float: left;
		}

		.goods_beforePrice {
			padding: 10rpx 0;
		}

	}
</style>
