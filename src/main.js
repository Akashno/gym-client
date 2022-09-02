import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
//
Vue.config.productionTip = false 

// HTTP connection to the API

import { createProvider } from './vue-apollo.js';
const { apolloProvider  } = createProvider();

// Cache implementation

// Create the apollo client
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)
new Vue({
  router,
  store,
  vuetify,
 apolloProvider,
  render: h => h(App)
}).$mount('#app')
