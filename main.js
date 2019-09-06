import Vue from 'vue'
import App from './App'

var mqtt = require('@/utils/chat.js');
 
Vue.prototype.mqtt = mqtt;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
