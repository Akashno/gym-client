<template>
<v-container fluid >
  <v-card width="100%" class="pt-4 rounded-xl" outlined height="340px">
    <span class="text-caption  ml-6 grey--text text--darken-2 ">Latest Joinees</span>
    <v-data-table
    disable-sort
    mobile-breakpoint="0"
    hide-default-footer
    :height="$vuetify.breakpoint.smAndDown ? '100%':'240px'"
      :headers="headers"
      :items="latestJoins"
      class="pa-2"
      loading-text="Loading... Please wait"
    >
<template v-slot:item.id="{ item,index }">
  {{index + 1}}
      </template>
    <template v-slot:item.client="{ item }">
        {{ `${item.firstName} ${item.lastName}` }}
      </template>
<template v-slot:item.doj="{ item }">
  {{moment(new Date(parseInt(item.doj))).format('MMMM DD YYYY')}}
      </template>
    </v-data-table>
  </v-card>
</v-container>
  
</template>

<script>
import moment from 'moment'
  export default {
    props:{latestJoins:Array},
    data: () => ({
      moment:moment,
      headers: [
        { text: "No", value: "id" ,width:"20px"},
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "client",
          width:120
        },
        { text: "Date of join", value: "doj" ,width:"120px"},
      ],
    }),


  }
</script>
