<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="drawer"  v-if="$store.state.token"/>
    <v-app-bar app  elevation="0" color="" v-if="$store.state.token">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-btn text small @click="showTime = !showTime" outlined>
        <span v-if="showTime" class="d-flex align-center ">
          <v-icon class="me-1" x-small>mdi-clock</v-icon>{{ time }}
        </span>
        <span v-else class="d-flex align-center"> <v-icon x-small class="me-1">mdi-calendar</v-icon>{{ date }} </span>
      </v-btn>

      <v-btn @click="setDarkMode()" icon >
        <v-icon v-if="$vuetify.theme.dark"> mdi-white-balance-sunny </v-icon>
        <v-icon v-else> mdi-moon-waning-crescent </v-icon>
      </v-btn>

      <v-btn @click="logout" icon class="">
        <v-icon>mdi-location-exit</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view style="" class="" />
    </v-main>

    <v-snackbar
      :timeout="4000"
      :color="$store.state.snackColor"
      elevation="12"
      dense
      :value="$store.state.isSnack"
      height="50px"
      right
      outlined
    >
      <v-icon
        v-text="
          $store.state.snackColor === 'error' ? 'mdi-alert-circle' : 'mdi-check'
        "
      ></v-icon>
      <span class="font-weight-bold">
        {{ $store.state.snackText }}
      </span>
    </v-snackbar>
  </v-app>
</template>
<script>
import NavigationDrawer from "./components/NavigationDrawer.vue";
import moment from "moment";
import { onLogout } from './vue-apollo';
export default {
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      drawer: true,
      time: null,
      date: null,
      showTime: true,
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
    this.date = moment().format("DD-MMMM-YYYY");
    setInterval(() => {
      this.setTime();
    }, 1000);
  },
  created() {
    const darkMode = JSON.parse(localStorage.getItem("darkMode"));
    this.$vuetify.theme.dark = darkMode;
    let token = localStorage.getItem("GYM_USER")
    this.$store.commit('setUser',token)
    if(!token) this.logout() 
  },
  methods: {
    setDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("darkMode", this.$vuetify.theme.dark);
    },
    setTime() {
      this.time = moment().format("hh:mm:ss a");
    },
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
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
