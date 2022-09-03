import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    isSnack:false,
    snackColor:'',
    snackText:'',
  },
  getters: {
  },
  mutations: {
    setSnackBar(state,payload){
      state.isSnack=true
      state.snackColor=payload.color
      state.snackText=payload.text
    },
    unSetSnackBar(state){
      state.isSnack = false
      state.snackColor=''
      state.snackText=''
    },
    setUser(state,payload){
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
