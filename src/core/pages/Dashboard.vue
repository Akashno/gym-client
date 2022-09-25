<template>
<v-container   class="pa-0 pa-md-4 ">
      <v-overlay :value="loading" absolute></v-overlay>


    <v-row dense no-gutters  v-if="dashboard" >
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
</v-container>
</template>

<script>
import gql from "graphql-tag";
import FeeToday from "../components/FeeToday";
import LatestJoins from "../components/LatestJoins";
import MonthGraph from "../components/MonthGraph";
import TotalGraph from "../components/TotalGraph";
import {dashboardGql} from '../api'

export default {
  name: "Dashboard",
  data(){
    return{
      loading:false,
    }
  },
  components: {
    FeeToday,
    LatestJoins,
    MonthGraph,
    TotalGraph
    
  },
apollo: {
    dashboard() {
      return {
        query: gql`${dashboardGql} `,
         fetchPolicy: 'cache-and-network',
         watchLoading(loading){
          this.loading = loading
         }

      };
    },
  }
};
</script>
