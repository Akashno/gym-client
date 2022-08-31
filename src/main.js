import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
//
Vue.config.productionTip = false 
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:5000/graphql',
  
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
new Vue({
  router,
  store,
  vuetify,
 apolloProvider,
  render: h => h(App)
}).$mount('#app')
