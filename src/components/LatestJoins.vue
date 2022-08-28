<template>
<v-container fluid >
  <v-card width="100%" class="py-4 rounded-xl" outlined height="340px">
    <span class="text-caption  ml-6 grey--text text--darken-2 ">Latest Joinees</span>
    <v-data-table
    disable-sort
    mobile-breakpoint="0"
    hide-default-footer
    :height="$vuetify.breakpoint.smAndDown ? '100%':'240px'"
      :headers="headers"
      :items="clients"
      class="pa-2"
      loading-text="Loading... Please wait"
    >
    </v-data-table>
  </v-card>
</v-container>
  
</template>

<script>
import moment from 'moment'
  export default {
    data: () => ({
      headers: [
        { text: "No", value: "id" ,width:"20px"},
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "Age", value: "age" },
        { text: "Date of join", value: "doj" ,width:"120px"},
      ],
      clients: [
        {id:1, firstName: "Akash ",lastName:"N O ", age: 23, doj: moment().format("YYYY-MM-DD"), dob: moment().format("YYYY-MM-DD") },
        {id:2 ,firstName: "Vyshak",lastName:"P", age: 30,   doj: moment().format("YYYY-MM-DD"), dob: moment().format("YYYY-MM-DD") },
      ],
    }),


  }
</script>
