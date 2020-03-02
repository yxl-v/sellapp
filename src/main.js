import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);//全局注册ViewUI内的所有组件，让所有组件都可以直接使用此组件。
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

