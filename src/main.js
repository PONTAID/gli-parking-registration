import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "./plugins/vuetify-money.js";
import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'

Vue.component('v-text-field', VTextField)
Vue.use(VCurrencyField, { 
	locale: 'en-US',
	decimalLength: 0,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: null,
  valueAsInteger: false,
  allowNegative: false
})
  
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
