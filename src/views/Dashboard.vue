<template>
  <div class="pa-0 pa-md-4">
    <v-row dense no-gutters class="" v-if="dashboard" >
      <v-col cols="12" md="4">
        <TotalGraph :totalClients="dashboard.totalClients" />
      </v-col>
      <v-col cols="12" md="8">
        <MonthGraph :totalClientsThisMonth="dashboard.totalClientsThisMonth" />
      </v-col>
      <v-col cols="12" md="4">
        <FeeToday class="" :feePaymentsToday="dashboard.feePaymentsToday"/>
      </v-col>
      <v-col cols="12" md="8">
        <LatestJoins class="" :latestJoins="dashboard.latestJoins" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import FeeToday from "../components/FeeToday";
import LatestJoins from "../components/LatestJoins";
import MonthGraph from "../components/MonthGraph";
import TotalGraph from "../components/TotalGraph";

export default {
  name: "Dashboard",
  components: {
    FeeToday,
    LatestJoins,
    MonthGraph,
    TotalGraph
    
  },
apollo: {
    dashboard() {
      return {
        query: gql`
          query dashboard {
            dashboard{
            totalClients
            totalClientsThisMonth
            feePaymentsToday {
                _id
                firstName
                lastName
                dob
                doj
            }
            latestJoins {
                _id
                firstName
                lastName
                dob
                doj
            }
            }
          }
        `,
         fetchPolicy: 'cache-and-network',

      };
    },
  }
};
</script>
