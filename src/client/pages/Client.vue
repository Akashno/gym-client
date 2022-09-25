<template>
  <v-card
    class="py-10  px-8  "
    tile
    height="100vh"
    outlined
  >
    <v-row class="my-4 mx-0"  v-if="clientById">
      <v-avatar color="red" size="100" rounded="xl" class="me-4">
        <span class="white--text text-h4 text-uppercase " v-if="clientById">{{
          clientById.firstName.slice(0, 1) +
          " " +
          clientById.lastName.slice(0, 1)
        }}</span>
      </v-avatar>

      <div class="mt-3">
        <span v-if="clientById" class="text-h4">{{
          clientById.firstName + " " + clientById.lastName
        }}</span>

        <p class="mb-0 text-caption d-flex align-center mt-1">
          <v-icon x-small class="me-1">mdi-phone</v-icon>
          {{ clientById.phone }}
        </p>
        <v-chip outlined :color="clientById.isActive ?'success' :'' " x-small>{{clientById.isActive ? 'Active member' : 'Not active'}}</v-chip>

      </div>
      <v-spacer></v-spacer>

          <EditClient v-if="clientById" :client="clientById" class="me-2 mt-2" />
    </v-row>
    <v-row class="mt-10" align="center" v-if="clientById">
      <v-col  cols="6" md="2">
        <p class="mb-0 text-body-2 text--disabled">Age</p>
        <p class="mb-0 text-grey text-subtitle-1">
          {{ calculateAge(clientById.dob) }}
        </p>
      </v-col>
      <v-col cols="6" md="3">
        <p class="mb-0 text-body-2 text--disabled">Date of join</p>
        <p class="mb-0 text-grey text-subtitle-1">
          {{
            moment(new Date(parseInt(clientById.doj))).format("DD MMMM YYYY")
          }}
        </p>
      </v-col>
      <v-col cols="6" md="3">
        <p class="mb-0 text-body-2 text--disabled">Date of birth</p>
        <p class="mb-0 text-grey text-subtitle-1">
          {{
            moment(new Date(parseInt(clientById.dob))).format("DD MMMM YYYY")
          }}
        </p>
      </v-col>
      <v-col cols="6" md="2">
        <p class="mb-0 text-grey text-body-2 text--disabled">Contact Client</p>
        <p class="mb-0 text-grey text-subtitle-1 d-flex align-center">
          <v-btn  icon class="me-2">
          <a
            :href="`https://api.whatsapp.com/send?phone=91${clientById.phone}`"
            class="text-decoration-none cursor-pointer"
            style="color: inherit"
            target="_blank"
          >
            <v-icon  class="">mdi-whatsapp</v-icon>
          </a>
          </v-btn>
          <v-btn  icon class="me-2">
          <a
            :href="`tel:+91${clientById.phone}`"
            class="text-decoration-none"
            style="color: inherit"
          >
            <v-icon >mdi-phone</v-icon>
          </a>
          </v-btn>

          <v-btn  icon class="me-2">
          <a
            :href="`sms:+91${clientById.phone}`"
            class="text-decoration-none"
            style="color: inherit"
          >
            <v-icon>mdi-message-processing</v-icon>
          </a>
          </v-btn>

          <v-btn  icon class="me-2">
          <a
            :href="`mailto:${clientById.email}`"
            class="text-decoration-none"
            style="color: inherit"
          >
            <v-icon >mdi-email</v-icon>
          </a>
          </v-btn>
        </p>
      </v-col>
    </v-row>
    <v-divider class="mt-3 mb-6"></v-divider>
    <v-row class="">
      <v-col class="">
        <v-row justify="space-between" class="mx-0" align="center">
          <v-col cols="4">
            <span class="text-caption"> fee payments </span>
          </v-col>
          <v-spacer></v-spacer>
          <AddPayment :client="clientById" />
        </v-row>
        <v-card
          flat
          tile
          class="transparent rounded-xl grey"
          min-height="200px"
        >
          <v-row class="mx-0 mt-3 pa-2">
            <v-select
              :items="yearList"
              v-model="year"
              dense
              hide-details
              outlined
              class="col-1 mx-2 my-2 rounded-xl"
            >
            </v-select>

            <span
              class="d-block text-caption mt-4 mb-2 mx-auto"
              v-if="!payments.length"
              >No fee payments for {{ year }}
            </span>
            <v-chip
              v-for="(payment, index) in payments"
              outlined
              :key="index"
              width="100px"
              
              height="50px"
              class="ma-2 ps-0 pe-4"
              title="Fee Paid"
            >
              <v-card color="green" class="px-2 py-3 me-2">{{
                payment.amount
              }}</v-card>
              <span class="me-2">

              {{
                moment()
                  .month(payment.month - 1)
                  .format("MMMM")
              }}
              </span>
              
            </v-chip>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
import AddPayment from "../../payment/components/AddPayment.vue";
import gql from "graphql-tag";
import EditClient from "../components/EditClient.vue";
import { clientByIdGql } from '../api';
export default {
  components: {
    AddPayment,
    EditClient,
  },
  mounted() {
    this.clientId = this.$route.params.id;
    let currentYear = moment().year();
    let temp = [0, 1, 2, 3, 4];
    temp.map((item) => {
      this.yearList.push(currentYear - item);
    });
  },
  data() {
    return {
      clientId: null,
      year: moment().year(),
      yearList: [],
      monthList: [],
      moment: moment,
      dialog: false,
    };
  },
  computed: {
    payments() {
      if (!this.clientById) return [];
      let payments = this.clientById.payments.filter(
        (payment) => payment.year === this.year
      );
      return payments;
    },
  },
  methods: {
    calculateAge(dob) {
      return Math.abs(moment(new Date(parseInt(dob))).diff(moment(), "years"));
    },
  },
  apollo: {
    clientById() {
      return {
        query: gql`${clientByIdGql} `,
        result({ loading }) {
          this.loading = loading;
        },
        variables() {
          return {
            id: this.clientId,
          };
        },
        skip() {
          return !this.clientId;
        },
      };
    },
  },
};
</script>

<style></style>