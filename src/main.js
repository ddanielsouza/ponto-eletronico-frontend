import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css';
import {Conf} from './conf';
import "@/assets/css/app.css"
import VueNativeSock from 'vue-native-websocket'

Vue.router = router
Vue.config.productionTip = false
Vue.use(VueNativeSock, 'ws://127.0.0.1:3000', {
  format: 'json', 
  connectManually: true,
  reconnection: true, 
  reconnectionAttempts: 5, 
  reconnectionDelay: 3000, 
})

new Conf()
  .requests()
  .auth()
  .iView()
  .socket();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
