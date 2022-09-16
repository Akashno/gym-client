<template>
<v-container fluid >
  <v-card width="100%" class="py-4 rounded-xl " outlined height="340px" >
    <span class="text-caption  ml-6  text--darken-2 ">Current month fee pending</span>
    <p class="text-caption text-center mt-10" v-if="!feePaymentsToday.length" >No Pending fee payments this month</p>
  <v-virtual-scroll
      class="mt-4"
      :items="feePaymentsToday"
      :item-height="60"
      height="247"
    >
      <template v-slot:default="{ item }">
        <v-list-item link  class="" :style="checkDue(item)"> 
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
            <v-list-item-title>
              <router-link :to="{ name: 'Client', params: { id: item._id } }" class="text-decoration-none " style="color:inherit"> 
          <v-icon small>mdi-eye</v-icon> {{ item.firstName
        }} {{item.lastName}}</router-link>
              </v-list-item-title>
          </v-list-item-content>
    
          <v-list-item-action class="text-caption">
            DOJ : {{moment(new Date(parseInt(item.doj))).format('DD-MM-YY')}}
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>

  </v-card>
</v-container>
  
</template>

<script>

import moment from 'moment'
  export default {
  methods:{
    checkDue(item){ // if payment is due then show right red border 
      let dayOfJoin = moment(new Date(parseInt(item.doj))).date()
      let today = moment().date()
      if(dayOfJoin <= today){
        return 'border-left:4px solid red'
      }
    }
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
