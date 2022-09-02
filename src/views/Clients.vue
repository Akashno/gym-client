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
      :items="getAllClients"
      class="pa-2"
      loading-text="Loading... Please wait"
    >
    
      <template v-slot:item.client="{ item }">
        {{ `${item.user.firstName} ${item.user.lastName}` }}
      </template>
      <template v-slot:item.doj="{ item }">
        {{ moment(new Date(parseInt(item.user.doj))).format(" MMMM DD YYYY") }}
      </template>
      <template v-slot:item.dob="{ item }">
        {{ moment(new Date(parseInt(item.user.dob))).format(" MMMM DD YYYY") }}
      </template>
      <template v-slot:item.action="{ item }">
        <EditClient :client="item" />
      </template>
    </v-data-table>
  </div>
</template>
<script>
import AddClient from "../components/AddClient.vue";
import EditClient from "../components/EditClient.vue";
import moment from "moment";
import gql from "graphql-tag";

export default {
  components: {
    AddClient,
    EditClient,
  },
  data() {
    return {
      moment: moment,
      headers: [
        {
          text: "Client",
          align: "start",
          sortable: false,
          value: "client",
        },
        { text: "Age", value: "user.age" },
        { text: "Date of join", value: "doj" },
        { text: "Date of Birth", value: "dob" },
        { text: "Action", value: "action" },
      ],
    };
  },
  
  apollo: {
    getAllClients() {
      return {
        query: gql`
          query getAllClients {
            getAllClients {
              _id
              user {
                _id
                firstName
                lastName
                dob
                doj
                age
              }
            }
          }
        `,
      };
    },
  },
};
</script>
