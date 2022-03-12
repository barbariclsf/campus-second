import Vue from 'vue'
import App from './App'
// 引入封装的请求库
import request from '@/utils/request.js'
// 引入封装的提示库
import toast from '@/utils/toast.js'
import loading from '@/utils/toast.js'

// 使用
Vue.use(request)
Vue.use(toast)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
