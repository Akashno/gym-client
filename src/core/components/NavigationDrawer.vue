<template>
    <v-navigation-drawer
      v-model="isDrawer"
      app
    >
       <template v-slot:prepend>
        <v-list-item two-line class="mb-5">
          <v-list-item-avatar size="80">
              <v-img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnXf4cf2JV3KFCwCvO6i4fcAGLmbuvRM2KCFubbvDsNitUxWIVuRbX4O0GU2_6eF4lAA&usqp=CAU"
> </v-img>
          </v-list-item-avatar>
          <v-list-item-content class=" " style="z-index:10;">
             <v-list-item-title class=" text-h6">
              Dark Fit
              </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
     <v-list dense >
        <v-list-item class="py-2" link  :to="{name:'Dashboard'}" exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="py-2" link  :to="{name:'Clients'}">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Clients</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

       <v-list-item class="py-2" link  :to="{name:'Payments'}">
          <v-list-item-icon>
            <v-icon>mdi-cash-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Payments</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
       
      <!--  -->
    </v-navigation-drawer>
</template>
<script>
  export default {
    props:{
        drawer:{
            type:Boolean,
        }
    },
    watch:{
        drawer:{
          handler(){
            this.isDrawer = this.drawer
          }
        },
    },

    data(){
      return{
        isDrawer:true
      }
    }
  }
</script>