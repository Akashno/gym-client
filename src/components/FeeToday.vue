<template>
<v-container fluid >
  <v-card width="100%" class="py-4 rounded-xl " outlined height="340px" >
    <span class="text-caption  ml-6  text--darken-2 ">Fee payment today</span>
    <p class="text-caption text-center mt-10" v-if="!feePaymentsToday.length" >No fee payments today</p>
  <v-virtual-scroll
      class="mt-4"
      :items="feePaymentsToday"
      :item-height="60"
      height="247"
    >
      <template v-slot:default="{ item }">
        <v-list-item link>
          <v-list-item-avatar>
            <v-avatar
              :color="item.color"
              size="38"
              class="white--text"
            >
              <v-img src="https://mellomusings.com/content/images/2021/10/Ultra-Low_Res.jpg">

              </v-img>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title><Client :client="item"/></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="text-caption">
            DOJ : {{moment(new Date(parseInt(item.doj))).format('MM-DD-YY')}}
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>

  </v-card>
</v-container>
  
</template>

<script>

import Client from "../components/Client.vue";
import moment from 'moment'
  export default {
  components:{
    Client

  },
    data(){
      return{

    moment:moment
      }
    },
    props:{
      feePaymentsToday:Array
    },
  }
</script>
