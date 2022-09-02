<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" outlined class="red--text">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto pa-4" max-width="500">
      <v-card-title
        class="text-h6 font-weight-regular justify-space-between px-4"
      >
        <span>Add New Client</span>
      </v-card-title>
      <v-row class="mt-6 mx-0">
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model="firstName"
            dense
            label="First Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="" class="py-0">
          <v-text-field
            dense
            v-model="lastName"
            label="Last name"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-0">
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
                :value="moment(dob).format('DD/MM/YYYY')"
                label="Date of Birth"
                persistent-hint
                v-bind="attrs"
                dense
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
                :value="moment(doj).format('DD/MM/YYYY')"
                label="Date of Joining"
                persistent-hint
                v-bind="attrs"
                dense
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

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false" outlined text>cancel</v-btn>
        <v-btn
          :loading="loading"
          color="primary"
          :disabled="!isValid"
          depressed
          @click="createClient()"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import moment from "moment";
import gql from "graphql-tag";
export default {
  data: () => ({
    loading: false,
    dialog: false,
    moment: moment,
    isDobMenu: false,
    isDojMenu: false,
    firstName: "",
    lastName: "",
    dob: moment().subtract(18,'year').format("YYYY-MM-DD"),
    doj: moment().format("YYYY-MM-DD"),
  }),
  computed: {
    isValid() {
      return this.firstName && this.lastName && this.dob && this.doj;
    },
  },
  methods: {
    resetForm(){
      this.firstName = "",
      this.lastName = "",
      this.dob = moment().format("YYYY-MM-DD"),
      this.doj= moment().format("YYYY-MM-DD")

    },
    createClient() {
      this.loading = true;
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation createClient($input: ClientInput) {
              createClient(input: $input) {
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
              firstName: this.firstName,
              lastName: this.lastName,
              dob: this.dob,
              doj: this.doj,
            },
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data: { createClient } }) => {
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
            `;
            const data = store.readQuery({ query: GET_ALL_CLIENTS });
            data.getAllClients.push(createClient);
            store.writeQuery({ query: GET_ALL_CLIENTS, data });
          },
        })
        .then(() => {
          this.loading = false;
          this.dialog = false;
          this.resetForm()
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
  },
};
</script>
