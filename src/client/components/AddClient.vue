<template>
  <v-dialog
    v-model="dialog"
    :overlay-opacity="$vuetify.theme.dark ? '1' : '0.9'"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    width="700"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" outlined class="red--text">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto pa-4" max-width="700" outlined>
      <v-card-title
        class="text-h6 font-weight-regular justify-space-between px-4"
      >
        <span>Add New Client</span>
      </v-card-title>
      <v-row class="mt-6 mx-0">
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model="client.firstName"
            dense
            label="First Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="" class="py-0">
          <v-text-field
            dense
            v-model="client.lastName"
            label="Last name"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            type="number"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            v-model="client.phone"
            dense
            label="Phone number"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="" class="py-0">
          <v-text-field
            dense
            type="email"
            v-model="client.email"
            label="Email Id"
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
                :value="moment(client.dob).format('DD/MM/YYYY')"
                label="Date of Birth"
                persistent-hint
                v-bind="attrs"
                dense
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="client.dob"
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
                :value="moment(client.doj).format('DD/MM/YYYY')"
                label="Date of Joining"
                persistent-hint
                dense
                outlined
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="client.doj"
              no-title
              @input="isDojMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="py-0" cols="12" md="6">
          <v-select
            dense
            outlined
            :items="['MALE', 'FEMALE','OTHER']"
            v-model="client.gender"
          ></v-select>
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
    client: {
      firstName: "",
      lastName: "",
      dob: moment().subtract(18, "year").format("YYYY-MM-DD"),
      doj: moment().format("YYYY-MM-DD"),
      gender: "MALE",
    },
    clientClone: {},
  }),
  mounted() {
    this.clientClone = { ...this.client };
  },
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
    resetForm() {
      this.client = { ...this.clientClone };
    },
    createClient() {
      this.loading = true;
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation createClient($input: UserInput) {
              createClient(input: $input) {
                _id
                userCode
                firstName
                lastName
                phone
                gender
                isActive
                email
                dob
                doj
              }
            }
          `,
          // Parameters
          variables: {
            input: {
              ...this.client,
            },
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data: { createClient } }) => {
            const CLIENTS = gql`
              query clients($input: PageInput!, $filter: FilterInput) {
                clients(input: $input, filter: $filter) {
              clients{
                _id
                userCode
                firstName
                lastName
                phone
                email
                gender
                dob
                isActive
                doj
              }
              totalClients
                }
              }
            `;
            let variables = {
              input: { limit: 10, skip: 0 },
              filter: { search: "" },
            };
            const data = store.readQuery({ query: CLIENTS, variables });
            data.clients.clients.unshift(createClient);
            data.clients.totalClients +=1
            store.writeQuery({ query: CLIENTS, data, variables });
          },
        })
        .then(() => {
          this.$store.commit("setSnackBar", {
            color: "success",
            text: "New Client Added",
          });
          this.loading = false;
          this.dialog = false;
          this.resetForm();
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error.graphQLErrors[0]?.message;
          if (this.errorMessage) {
            this.$store.commit("setSnackBar", {
              color: "error",
              text: this.errorMessage,
            });
          }

          this.loading = false;
        });
    },
  },
};
</script>