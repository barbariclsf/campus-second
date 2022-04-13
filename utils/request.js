
// 单体本地接口
const commonUrl = "http://localhost:8080/";


/**
 * @description POST请求封装
 * @param { String } url 请求的接口
 * @param { Object } data 请求的参数
 * @example 
 * this.$post(
 * 	'app/api', 
 * 	{name: 'yzp'}).then(res => {
 *     console.log('请求成功')}).catch(err => {console.log(err)})
 */
export function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		this.$loading('加载中...', true);
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: "POST",
			header: {
				"content-type": "application/x-www-form-urlencoded",
				Authorization: uni.getStorageSync("sessionId")
			},
			success: function(res) {
				uni.hideLoading();
				//返回什么就相应的做调整
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					// 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
					// 接口后面的then执行
					// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
					// 不会被阻断在那里执行不下去！
					resolve(res.data.msg);
				}
			},
			error: function(e) {
				uni.hideLoading();
				reject("网络出错");
			}
		});
	});
	return promise;
}

/**
 * @description GET请求封装
 * @param { String } url 请求的接口
 * @param { Object } data 请求的参数
 * @example 
 * this.$get(
 * 	'app/api', 
 * 	{name: 'yzp'}).then(res => {
 *     console.log('请求成功')}).catch(err => {console.log(err)})
 */
export function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		this.$loading('加载中...', true);
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: "GET",
			dataType: "json",
			header: {
				"content-type": "application/x-www-form-urlencoded",
				Authorization: uni.getStorageSync("CYSessionId")
			},
			success: function(res) {
				uni.hideLoading();
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					// 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
					// 接口后面的then执行
					// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
					// 不会被阻断在那里执行不下去！
					resolve(res.data);
				}
			},
			error: function(e) {
				uni.hideLoading();
				reject("网络出错");
			}
		});
	});
	return promise;
}

function install(Vue) {
	Vue.prototype.$post = postRequest
	Vue.prototype.$get = getRequest
}

export default {
	install
}
