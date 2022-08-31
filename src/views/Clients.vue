<template>
  <div>
    <v-img
      position="center center"
      max-height="300px"
      cover
      src="https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    >
    </v-img>
    <div class="d-flex justify-space-between align-center mx-0 pa-4">
      <h2 class="">Clients</h2>
      <AddClient />
    </div>
    <v-data-table
      :headers="headers"
      :items="clients"
      class="pa-2"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.action="{ item }">
        <EditClient :client="item"/>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import AddClient from "../components/AddClient.vue";
import EditClient from "../components/EditClient.vue";
import moment from 'moment';
import gql from 'graphql-tag'

export default {
  components: {
    AddClient,
    EditClient,
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "Age", value: "age" },
        { text: "Date of join", value: "doj" },
        { text: "Date of Birth", value: "dob" },
        { text: "Action", value: "action" },
      ],
      clients: [
        { firstName: "Akash ",lastName:"N O ", age: 23, doj: moment().format("YYYY-MM-DD"), dob: moment().format("YYYY-MM-DD") },
        { firstName: "Vyshak",lastName:"P", age: 30,   doj: moment().format("YYYY-MM-DD"), dob: moment().format("YYYY-MM-DD") },
      ],
    };
  },
  apollo: {
  getAllClients () {
    return {
      query: gql`query getAllClients {
        getAllClients{
          user{
            firstName
          }
        }
      }`,
    }
  },
},
};
</script>
