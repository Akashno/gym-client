<template>
<v-container fluid >
  <v-card width="100%" class="py-4 rounded-xl " outlined height="340px" >
    <span class="text-caption  ml-6 grey--text text--darken-2 ">Fee payment today</span>
  <v-virtual-scroll
  class="mt-4"
      :items="items"
      :item-height="60"
      height="260"
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
            <v-list-item-title>{{ item.fullName }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              depressed
              small
              text
            >
            Joined : 
            {{item.doj}}

              
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>

  </v-card>
</v-container>
  
</template>

<script>
  export default {
    data: () => ({
      items:[
        {color:"black",fullName:"Akash N O",initials:"AK",doj:"12/12/12"},
        {color:"black",fullName:"Yaswanth R",initials:"YR",doj:"12/12/12"},
        {color:"black",fullName:"Rony T",initials:"RT",doj:"12/12/12"},
        {color:"black",fullName:"Babu K ",initials:"BK",doj:"12/12/12"},

      ]
    }),


    methods: {
      genRandomIndex (length) {
        return Math.ceil(Math.random() * (length - 1))
      },
    },
  }
</script>
