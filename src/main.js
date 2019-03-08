import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import {router} from "./router/"
import KyeeUI from './common/kyee_ui/js/kyee_ui'
import './common/kyee_ui/css/kyee_ui.css'
import store from './vuex/index'
import config from './config/config'

Vue.use(KyeeUI);
Vue.use(VueRouter);
Vue.prototype.$config = config;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
