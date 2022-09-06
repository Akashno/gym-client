<template>
  <div>
    <v-btn outlined icon small @click="isDrawer = true" title="Edit client details">
      <v-icon small>mdi-pencil</v-icon>
    </v-btn>
    <v-navigation-drawer
      :width="$vuetify.breakpoint.smAndDown ? '100%' : '800px'"
    :overlay-opacity="$vuetify.theme.dark ? '1':'0.9'"
      temporary
      app
      right
      v-model="isDrawer"
      class="pa-md-10 pa-4"
    >
      <v-row class="mt-2">
        <v-col cols="12" class="d-flex justify-space-between align-center">
          <span class="text-h6 ">Edit Client</span>
          <v-btn icon @click="isDrawer = false" outlined>
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model="clientInfo.firstName"
            label="First Name"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="" class="py-0">
          <v-text-field
            v-model="clientInfo.lastName"
            label="Last name"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="">
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            type="number"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            v-model="clientInfo.phone"
            label="Phone number"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="" class="py-0">
          <v-text-field
            type="email"
            v-model="clientInfo.email"
            label="Email Id"
            dense
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
                dense
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
                dense
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
      <v-row class="">
        <v-col class="py-0" cols="12" md="6">
          <v-select
            dense
            outlined
            :items="['MALE', 'FEMALE']"
            v-model="clientInfo.gender"
          ></v-select>
        </v-col>

        <v-col class="py-0 px-4" cols="12" md="6">
          <v-switch
            v-model="clientInfo.isActive"
            class="mt-0"
            hide-details
            inset
            :label="`Active `"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row class="mx-0 mt-10" justify="space-between">
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
    this.clientInfo = { ...this.client }; // need to find a better method to deep copy
    if (this.clientInfo.dob) {
      this.dob = moment(new Date(parseInt(this.clientInfo.dob))).format(
        "YYYY-MM-DD"
      );
    }
    if (this.clientInfo.doj) {
      this.doj = moment(new Date(parseInt(this.clientInfo.doj))).format(
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
                firstName
                lastName
                phone
                email
                gender
                isActive
                dob
                doj
              }
            }
          `,
          // Parameters
          variables: {
            input: {
              id: this.clientInfo._id,
              firstName: this.clientInfo.firstName,
              lastName: this.clientInfo.lastName,
              dob: this.dob,
              doj: this.doj,
              phone: this.clientInfo.phone,
              email: this.clientInfo.email,
              gender: this.clientInfo.gender,
              isActive: this.clientInfo.isActive,
            },
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data: { updateClient } }) => {
            const CLIENTS = gql`
              query clients {
                clients {
                  _id
                  firstName
                  lastName
                  phone
                  email
                  gender
                  isActive
                  dob
                  doj
                }
              }
            `;
            const data = store.readQuery({ query: CLIENTS });
            let index = data.clients.findIndex(
              (client) => client._id === updateClient._id
            );
            data.clients[index] = updateClient;
            store.writeQuery({ query: CLIENTS, data });
          },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
        })
        .then(() => {
          this.$store.commit("setSnackBar", {
            color: "success",
            text: "Client info updated",
          });
          this.loading = false;
          this.isDrawer = false;
        })
        .catch(() => {
          this.$store.commit("setSnackBar", {
            color: "error",
            text: "Something Went wrong",
          });
          this.loading = false;
        });
    },
  },
  computed: {
    isValid() {
      return (
        this.clientInfo.gender &&
        this.clientInfo.phone &&
        this.clientInfo.email &&
        this.clientInfo.firstName &&
        this.clientInfo.lastName &&
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
