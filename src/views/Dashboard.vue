<template>
  <div>
    <v-row dense no-gutters class="">
      <v-col cols="12" md="4">
        <TotalGraph />
      </v-col>
      <v-col cols="12" md="8">
        <MonthGraph />
      </v-col>
      <v-col cols="12" md="4">
        <FeeToday class="" />
      </v-col>
      <v-col cols="12" md="8">
        <LatestJoins class="" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
};
</script>
