import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import {store} from './store/store'
import {firebase} from './firebase'

Vue.use(VueRouter);
Vue.config.productionTip = false
const router = new VueRouter({
  routes,
  mode:"history",
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
