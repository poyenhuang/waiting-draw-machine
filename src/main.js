import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// define global counter status
Vue.prototype.$counterStatusDict = {
  offline: 0,
  idle: 1,
  processing: 2,
}

new Vue({
  render: h => h(App),
}).$mount('#app');
