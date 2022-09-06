<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="drawer" />
    <v-app-bar app absolute elevation="0" color="">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn @click="$vuetify.theme.dark=!$vuetify.theme.dark" icon>
      <v-icon v-if="$vuetify.theme.dark"> mdi-white-balance-sunny </v-icon>
      <v-icon v-else> mdi-moon-waning-crescent </v-icon>
      </v-btn>
      
      <v-btn @click="logout" icon class="me-1">
        <v-icon>mdi-location-exit</v-icon>
      </v-btn>
      
    </v-app-bar>
    <v-main>
      <router-view style="" class="" />
    </v-main>

    <v-snackbar
      :color="$store.state.snackColor"
      :timeout="3000"
      dense
      :value="$store.state.isSnack"
      height="50px"
      right
    >
      <v-icon> mdi-check </v-icon>
      {{ $store.state.snackText }}
    </v-snackbar>
  </v-app>
</template>
<script>
import NavigationDrawer from "./components/NavigationDrawer.vue";
import moment from "moment";
export default {
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      drawer: true,
      time: null,
    };
  },
  watch: {
    "$store.state.isSnack": {
      handler() {
        setTimeout(() => {
          this.$store.commit("unSetSnackBar");
        }, 2000);
      },
    },
  },
  mounted() {
    this.setTime();
    setInterval(() => {
      this.setTime();
    }, 1000);
  },
  methods: {
    setTime() {
      this.time = moment().format("hh:mm:ss a");
    },
    logout() {
      this.$store.commit("setUser", null);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
