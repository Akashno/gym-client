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
    <div class="">
      <v-data-table
        mobile-breakpoint="0"
        disable-sort
        :headers="headers"
        :loading="loading"
        :items="payments"
        class="ma-4"
        loading-text="Loading... Please wait"
      >
       <template v-slot:item.paymentCode="{ item }">
        <span>
        #{{item.paymentCode}}
        </span>
        </template>
        <template v-slot:item.client="{ item }">
          <router-link
            :to="{ name: 'Client', params: { id: item.user._id } }"
            style="color: inherit"
          >
            {{ item.firstName }} {{ item.lastName }}
            </router-link >
        </template>
        <template v-slot:item.phone="{ item }">
          {{ item.phone || "-" }}
        </template>

        <template v-slot:item.month="{ item }">
          {{
            moment().month(item.month).subtract(1, "month").format("MMMM YYYY")
          }}
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{
            moment(new Date(parseInt(item.createdAt))).format("DD MMM YYYY")
          }}
        </template>
        <template v-slot:item.amount="{ item }">
          <v-icon small>mdi-currency-inr</v-icon>
          {{ item.amount.toFixed(2) }}
        </template>
        <template v-slot:item.download="{ item }">
          <v-btn @click="downloadReceipt(item)" text>
          <v-icon>mdi-download-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";
import { feeReceipt} from '@/payment/methods/feeReceipt'
import { paymentsGql } from '../api';

export default {
  data() {
    return {
      moment: moment,
      loading: false,
      limit: 10,
      skip: 0,
      search: "",
      headers: [
         {
          text: "Payment Id",
          align: "start",
          sortable: false,
          value: "paymentCode",
          width: 100,
        },
        {
          text: "Client",
          align: "start",
          sortable: false,
          value: "client",
          width: 100,
        },
        {
          text: "Paid On",
          value: "createdAt",

          width: 100,
        },
        { text: "Phone", value: "phone", width: 100 },
        { text: "Month", value: "month", width: 100 },
        { text: "Amount", value: "amount", width: 100 },
        { text: "Download", value: "download", width: 100 ,align:"center"},
      ],
    };
  },
  methods:{
    downloadReceipt(payment){
       feeReceipt(payment)
    },
    showClient(item) {
      this.$router.push({ name: "Client", params: { id: item.user._id } });
    },
  },
  apollo: {
    payments() {
      return {
        query: gql`${paymentsGql} `,
        variables() {
          return {
            input: {
              limit: this.limit,
              skip: this.skip,
            },
            filter: {
              search: this.search,
            },
          };
        },
        fetchPolicy: "cache-and-network",
        result({ loading }) {
          this.loading = loading;
        },
      };
    },
  },
};
</script>

<style></style>
