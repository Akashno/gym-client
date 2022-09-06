<template>
<div>

<v-img
      position="top top"
      max-height="300px"
      cover
      src="https://images.unsplash.com/photo-1554344728-77cf90d9ed26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    >
    </v-img>


<div class="pa-4 mx-0">
      <h2 class="">Payments</h2>
    </div>
<div class="">

    <v-data-table
    mobile-breakpoint="0"
      :headers="headers"
      :loading="loading"
      :items="payments"
      class="pa-2"
      loading-text="Loading... Please wait"
    >
<template v-slot:item.client="{ item }">
        <Client  :client="{...item,_id:item.user._id}"/>
      </template>
<template v-slot:item.month="{ item }">
    {{moment().month(item.month).subtract(1,'month').format('MMMM')}}
      </template>
<template v-slot:item.createdAt="{ item }">
    {{moment(new Date(parseInt(item.createdAt))).format('DD MMMM YYYY')}}
      </template>
    </v-data-table>
</div>
</div>
</template>

<script>

import gql from "graphql-tag";
import moment from 'moment'

import Client from "../components/Client.vue";
export default {
    components: {
    Client
    },
    data(){
        return{
            moment:moment,
        loading:false,
        headers: [
        {
          text: "Client",
          align: "start",
          sortable: false,
          value: "client",
        },
        { text: "Paid On", value: "createdAt" },
        { text: "Phone", value: "phone" },
        { text: "Amount", value: "amount" },
        { text: "Month", value: "month" },
        { text: "Year", value: "year" },
      ]
        }

    },
    apollo: {
    payments() {
      return {
        query: gql`
          query payments {
            payments {
                _id

             user{
                _id
              }
              createdAt 
              firstName
              lastName
              phone

              year
              month
              amount
            }
          }
        `,

         fetchPolicy: 'cache-and-network',
        result({ loading }) {
          this.loading = loading;
        },
      };
    },
  }

}
</script>

<style>

</style>