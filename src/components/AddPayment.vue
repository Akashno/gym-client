<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :overlay-opacity="$vuetify.theme.dark ? '1':'0.9'"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        outlined
        class=""
        small
        title="Add new payment"
      >
      <v-icon small>mdi-currency-inr</v-icon>
        
      </v-btn>
    </template>

    <v-card class="mx-auto pa-4 " max-width="500" outlined  :rounded="$vuetify.breakpoint.smAndDown ? '0' :'xl' ">
      <v-card-title
        class="text-body-1 font-weight-regular justify-space-between px-4"
      >
        <span>Add fee for {{ `${client.firstName} ${client.lastName}` }} </span>
      </v-card-title>
      <v-card-text class="px-0">
        <v-row class="mt-6 mx-0">
          <v-col cols="12" md="12" class="py-0">
            <v-select
              v-model="month"
              outlined
              dense
              label="Select month"
              :items="monthList"
              item-text="text"
              item-value="value"
            >
            </v-select>
          </v-col>
          
        </v-row>
        <v-row class="mx-0">
          <v-col cols="12" md="12" class="py-0">
            <v-text-field v-model="amount" outlined label="Fee Amount" dense>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" outlined text>cancel</v-btn>
        <v-btn
          :loading="loading"
          color="primary"
          depressed
          @click="addPayment()"
          >Add Payment</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import moment from "moment";
import gql from "graphql-tag";
import {updatePaymentCache} from '@/methods/updateCache.js'
export default {
  props: {
    client: Object,
  },
  data: () => ({
    loading: false,
    dialog: false,
    moment: moment,
    monthList: [
      { text: "January", value: 1 },
      { text: "February", value: 2 },
      { text: "March", value: 3 },
      { text: "April", value: 4 },
      { text: "May", value: 5 },
      { text: "June", value: 6 },
      { text: "July", value: 7 },
      { text: "August", value: 8 },
      { text: "September", value: 9 },
      { text: "October", value: 10 },
      { text: "November", value: 11 },
      { text: "December", value: 12 },
    ],

    month: moment().month() + 1,
    amount: 500,
  }),
  computed: {
    isValid() {
      return (
        this.client.firstName &&
        this.client.lastName &&
        this.client.dob &&
        this.client.doj &&
        this.client.gender
      );
    },
  },
  methods: {
    addPayment() {
      this.loading = true;
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation addPayment($input: PaymentInput) {
              addPayment(input: $input) {
                _id

                user {
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
          // Parameters
          variables: {
            input: {
              user: this.client._id,
              amount: parseFloat(this.amount) ,
              month: this.month,
            },
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data: { addPayment } }) => {
            debugger
            updatePaymentCache(store,addPayment,this.client)
          },
        })
        .then(() => {
          this.$store.commit("setSnackBar", {
            color: "success",
            text: "Payment added successfully",
          });
          this.loading = false;
          this.dialog = false;
        })
        .catch((error) => {
          const err = JSON.parse(JSON.stringify(error));
          if (err.message.includes("paymentAlreadyExists")) {
            this.$store.commit("setSnackBar", {
              color: "orange",
              text: "Fee already paid for selected month",
            });
          } else {
            this.$store.commit("setSnackBar", {
              color: "error",
              text: "Something went wrong",
            });
          }
          this.loading = false;
        });
    },
  },
};
</script>
