<template>
  <v-app id="inspire">
   <NavigationDrawer :drawer="drawer"/> 
      <v-app-bar
      app
      absolute
      elevation="0"
      color="white"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
    <v-main >
      <router-view style="" class=""/>
    </v-main>
  </v-app>
</template>
<script>
import NavigationDrawer from './components/NavigationDrawer.vue'
import moment from 'moment'
export default {
  components:{
    NavigationDrawer,
  },
  data(){
    return {
      drawer:true,
      time:null,
    }
  },
  mounted(){

    this.setTime()
    setInterval(()=>{
       this.setTime()  
    },1000)
  },
  methods:{
    setTime(){
      this.time = moment().format('hh:mm:ss a')
    }
  },
}
</script>

