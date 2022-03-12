/**
 * @author YZP
 * @description 对原生提示框使用进行封装, 提高使用效率
 * @param { String } title 提示内容,默认为空
 * @param { Number } duration 显示时间,默认1500
 * @param { String } icon 显示图标,默认为none,一共三种值: none、loading、success
 * @param { Boolean } mask 是否产生遮罩层,即提示产生后,屏幕不可触控,默认为true
 * @example this.$toast('操作成功', 2000, 'success', true);
 */
export function popTip(title = '', duration = 1500, icon = 'none', mask = true) {
    uni.showToast({
        title: title,
        icon: icon,
        duration: duration,
        mask: mask
    })
}


/**
 * @author YZP
 * @description 对原生加载提示框使用进行封装, 提高使用效率
 * @param { String } title 提示内容,默认为空
 * @param { Boolean } mask 是否产生遮罩层,即提示产生后,屏幕不可触控,默认为true
 * @example this.$loading('加载中', true);
 */
export function loading(title = '', mask = true) {
    uni.showLoading({
        title: title,
        mask: mask
    })
}

function install(Vue) {
    Vue.prototype.$toast = popTip
    Vue.prototype.$loading = loading
}

export default {install}

