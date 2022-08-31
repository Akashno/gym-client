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
        <v-btn color="primary" depressed @click="createClient()">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import moment from "moment";
import gql from 'graphql-tag'
  export default {
    data: () => ({
      dialog:false,
      moment: moment,
      isDobMenu: false,
      isDojMenu: false,
      firstName: "Aksh",
      lastName: "No",
      dob: moment().format("YYYY-MM-DD"),
      doj: moment().format("YYYY-MM-DD"),
    }),
    methods:{
      createClient(){
      this.$apollo.mutate({
      // Query
      mutation: gql`mutation createClient($input:ClientInput) {
        createClient(input:$input) {
          user{
            firstName
            lastName
          }
        }
      }`,
      // Parameters
      variables: {
        input:{
        firstName:this.firstName,
        lastName:this.lastName
        }
      },
      // Update the cache with the result
      // The query will be updated with the optimistic response
      // and then with the real result of the mutation
      // update: (store, { data: { addTag } }) => {
      //   // Read the data from our cache for this query.
      //   const { tags } = store.readQuery({ query: TAGS_QUERY })
      //   // Add our tag from the mutation to the end
      //   // We don't want to modify the object returned by readQuery directly:
      //   // https://www.apollographql.com/docs/react/caching/cache-interaction/
      //   const tagsCopy = tags.slice()
      //   tagsCopy.push(addTag)
      //   // Write our data back to the cache.
      // },
      // Optimistic UI
      // Will be treated as a 'fake' result as soon as the request is made
      // so that the UI can react quickly and the user be happy
    })}
  }
      
  }
</script>
