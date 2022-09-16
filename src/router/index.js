import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../core/pages/Dashboard.vue'
import Client from '../client/pages/Client.vue'
import Clients from '../client/pages/Clients.vue'
import Payments from '../payment/pages/Payments.vue'
import Login from '../core/pages/Login.vue'
import Profile from '../core/pages/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/client/:id?",
    name: "Client",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Client,
  },
  {
    path: "/clients",
    name: "Clients",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Clients,
  },
  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Profile,
  },
  {
    path: "/payments",
    name: "Payments",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Payments,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
   scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }

})

export default router
