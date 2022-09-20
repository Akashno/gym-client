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
    <v-row class="mx-1">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          dense
          append-icon="mdi-magnify"
          label="Search"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
    v-if="clients"
      mobile-breakpoint="0"
      :options.sync="options"
      :headers="headers"
      :loading="loading"
      :server-items-length="clients.totalClients"
      :items="clients.clients"
      class="ma-4"
      loading-text="Loading... Please wait"
    >
<template v-slot:item.userCode="{ item }">
        #{{item.userCode}}
      </template>
      <template v-slot:item.client="{ item }">
        <router-link
        
          :to="{ name: 'Client', params: { id: item._id } }"
          style="color: inherit;"
        >
          {{ item.firstName }} {{item.lastName}}</router-link
        >
      </template>
      <template v-slot:item.phone="{ item }">
        {{ item.phone || "-" }}
      </template>
      <template v-slot:item.isActive="{ item }">
        <v-chip
          :disabled="!item.isActive"
          outlined
          :color="item.isActive ? 'blue' : ''"
          v-text="item.isActive ? 'Active' : 'Inactive'"
        ></v-chip>
      </template>
      <template v-slot:item.doj="{ item }">
        {{ moment(new Date(parseInt(item.doj))).format(" MMMM DD YYYY") }}
      </template>
      <template v-slot:item.age="{ item }">
        {{ calculateAge(item.dob) }}
      </template>
      <template v-slot:item.dob="{ item }">
        {{ moment(new Date(parseInt(item.dob))).format(" MMMM DD YYYY") }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-row class="mx-0" >
          <EditClient :client="item" class="me-2" style="cursor: pointer" />
          <AddPayment :client="item" class="" />
          <v-btn icon outlined class="ms-2" small title="whatsapp text">
            <a
              target="_blank"
              :href="`https://api.whatsapp.com/send?phone=91${item.phone}`"
              class="text-decoration-none"
              style="color: inherit"
            >
              <v-icon small>mdi-whatsapp</v-icon>
            </a>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import AddClient from "../components/AddClient.vue";
import AddPayment from "../../payment/components/AddPayment.vue";
import EditClient from "../components/EditClient.vue";
import moment from "moment";
import gql from "graphql-tag";

export default {
  components: {
    AddClient,
    AddPayment,
    EditClient,
  },
  methods: {
    calculateAge(dob) {
      return Math.abs(moment(new Date(parseInt(dob))).diff(moment(), "years"));
    },
    showClient(item) {
      this.$router.push({ name: "Client", params: { id: item._id } });
    },
  },
  data() {
    return {
      loading: true,
      options: {
        page: 1,
        itemsPerPage: 10,
      },
      moment: moment,
      clientDrawer: false,
      search: "",
      limit: 10,
      skip: 0,
      headers: [

        { text: "Client Id", value: "userCode", width: 110 },
        {
          text: "Client",
          align: "start",
          value: "client",
          width: 200,
        },
        { text: "Age", value: "age", width: 80 },
        { text: "Phone", value: "phone" },
        { text: "Date of join", value: "doj", width: 300 },
        { text: "Active", value: "isActive" },
        { text: "Action", value: "action", width: 150 },
      ],
    };
  },
  watch: {
    search:{
      handler(){
        this.$apollo.queries.clients.refetch({filter:{search:this.search}})
      }
    },
    options: {
      handler() {
        this.limit = this.options.itemsPerPage;
        this.skip =this.options.itemsPerPage * this.options.page - this.options.itemsPerPage;
        this.$apollo.queries.clients.refetch({input:{limit:this.limit,skip:this.skip}})
      },
      immediate:false
    },
  },
  apollo: {
    clients() {
      return {
        query: gql`
          query clients($input: PageInput!, $filter: FilterInput) {
            clients(input: $input, filter: $filter) {
              clients{
              _id
              userCode
              firstName
              lastName
              phone
              email
              gender
              dob
              isActive
              doj
              }
              totalClients
            }
          }
        `,
        result({ loading }) {
          this.loading = loading;
        },
        variables:{
            input: {
              limit: this.limit,
              skip: this.skip,
            },
            filter: {
              search: this.search,
            },
          },
        fetchPolicy: "cache-and-network",
      };
    },
  },
};
</script>