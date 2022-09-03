<template>
  <v-card
    height="100vh"
    width="100vw"
    class="d-flex justify-center align-center"
  >
    <v-card :outlined="$vuetify.breakpoint.smAndUp ?true :false " width="400px"   class="px-10">
        <v-row justify="center" align="center" class=" pt-10">
        <span>
        <v-img
          width="200"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnXf4cf2JV3KFCwCvO6i4fcAGLmbuvRM2KCFubbvDsNitUxWIVuRbX4O0GU2_6eF4lAA&usqp=CAU"
        >
        </v-img>
        </span>
        </v-row>
        <v-row class="text-h4" justify="center">
              Dark Fit
        </v-row>
      <v-row class=" mt-10">
        <v-text-field v-model="phone"  dense placeholder="Phone" outlined color="secondary"></v-text-field>
        <v-text-field v-model="password" dense placeholder="Password" outlined color="secondary"></v-text-field>
      </v-row>
      <v-row justify="center" class="mb-10" >
        <v-btn  width="100%" color="secondary" @click="login" :disabled="!isValid">Login</v-btn>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
    data(){
        return{
            phone:null,
            password:null
        }
    },
    computed:{
        isValid(){
            return this.phone && this.password 
        }
    },
    methods:{
        login(){
            this.$store.commit('setUser',{name:'akash'})
            this.$router.push({name:"Dashboard"})
        }
    }
};
</script>

<style></style>
