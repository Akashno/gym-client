<template>
  <div>
    <v-btn outlined icon small @click="isDrawer = true">
      <v-icon small>mdi-pencil</v-icon>
    </v-btn>
    <v-navigation-drawer
      :width="$vuetify.breakpoint.smAndDown ? '100%' : '800px'"
      temporary
      hide-overlay
      app
      right
      v-model="isDrawer"
      class="pa-10"
    >
      <v-row class="mt-2">
        <v-col cols="12" class="d-flex justify-space-between align-center">
          <span class="text-h6 grey--text">Edit Client</span>
          <v-btn icon @click="isDrawer = false" outlined>
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model="clientInfo.user.firstName"
            label="First Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="" class="py-0">
          <v-text-field
            v-model="clientInfo.user.lastName"
            label="Last name"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0" cols="12" md="6">
          <v-menu
            ref="menu1"
            v-model="isDobMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="formatedDob"
                label="Date of Birth"
                persistent-hint
                v-bind="attrs"
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dob"
              no-title
              @input="isDobMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="py-0" cols="12" md="6">
          <v-menu
            ref="dojMenu"
            v-model="isDojMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="formatedDoj"
                label="Date of Joining"
                persistent-hint
                v-bind="attrs"
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="doj"
              no-title
              @input="isDojMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row class="mx-0" justify="space-between">
        <DeleteClient :clientId="client._id" @deleted="deleted" />
        <v-btn
          :loading="loading"
          @click="updateClient"
          outlined
          :disabled="!isValid"
        >
          Save</v-btn
        >
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import DeleteClient from "../components/DeleteClient.vue";
import gql from "graphql-tag";
import moment from "moment";
export default {
  components: {
    DeleteClient,
  },
  props: {
    client: {
      type: Object,
      require: true,
    },
  },
  mounted() {
    this.clientInfo = { ...this.client, user: { ...this.client.user } }; // need to find a better method to deep copy
    if (this.clientInfo.user.dob) {
      this.dob = moment(new Date(parseInt(this.clientInfo.user.dob))).format(
        "YYYY-MM-DD"
      );
    }
    if (this.clientInfo.user.doj) {
      this.doj = moment(new Date(parseInt(this.clientInfo.user.doj))).format(
        "YYYY-MM-DD"
      );
    }
  },
  data() {
    return {
      loading: false,
      moment: moment,
      isDobMenu: false,
      isDrawer: false,
      isDojMenu: false,
      dob: "",
      doj: "",
      clientInfo: { user: {} },
    };
  },
  methods: {
    deleted() {
      this.isDrawer = false;
      debugger;
    },
    updateClient() {
      this.loading = true;
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation updateClient($input: ClientInput) {
              updateClient(input: $input) {
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
          // Parameters
          variables: {
            input: {
              id: this.clientInfo._id,
              firstName: this.clientInfo.user.firstName,
              lastName: this.clientInfo.user.lastName,
              dob: this.dob,
              doj: this.doj,
            },
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data: { updateClient } }) => {
          const GET_ALL_CLIENTS = gql`
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
          `
          const data = store.readQuery({ query: GET_ALL_CLIENTS })
          let index = data.getAllClients.findIndex((client)=>client._id === updateClient._id)
          data.getAllClients[index] = updateClient
          store.writeQuery({ query: GET_ALL_CLIENTS, data })
          },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
        })
        .then(() => {
          this.loading = false;
          this.isDrawer = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    isValid() {
      return (
        this.clientInfo.user.firstName &&
        this.clientInfo.user.lastName &&
        this.dob &&
        this.doj
      );
    },
    formatedDob() {
      return this.dob ? moment(this.dob).format("YYYY/MM/DD") : "";
    },
    formatedDoj() {
      return this.doj ? moment(this.doj).format("YYYY/MM/DD") : "";
    },
  },
};
</script>

<style></style>
