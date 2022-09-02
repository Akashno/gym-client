<template>
      <v-dialog
      v-model="dialog"
      width="500"
      class="rounded-lg"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn  icon outlined color="red" v-on="on" v-bind="attrs">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.866 8.154a.77.77 0 0 1 .755.788l-.774-.019-.774-.019a.772.772 0 0 1 .793-.75Zm-.019.77-.774-.02v.044l-.003.124a143.54 143.54 0 0 0-.031 2.02 91.921 91.921 0 0 0 .035 4.014c.05 1.334.188 3.06.302 4.347C5.504 20.905 6.732 22 8.187 22h7.626c1.455 0 2.683-1.095 2.811-2.547.114-1.286.251-3.013.302-4.347a92 92 0 0 0 .035-4.014 174.24 174.24 0 0 0-.03-2.02l-.003-.124-.001-.043a.773.773 0 0 0-.793-.75.771.771 0 0 0-.755.787l.493-.012-.493.012v.042l.003.122.01.455c.007.388.015.93.021 1.546.011 1.236.011 2.76-.034 3.94-.05 1.294-.184 2.989-.298 4.271a1.263 1.263 0 0 1-1.268 1.143H8.187a1.263 1.263 0 0 1-1.269-1.143c-.113-1.282-.247-2.977-.297-4.27a90.475 90.475 0 0 1-.034-3.941 171.08 171.08 0 0 1 .03-2.001l.003-.122.001-.042-.774-.019ZM4 5.846c0-.425.347-.77.774-.77h14.452c.427 0 .774.345.774.77 0 .425-.347.77-.774.77H4.774A.772.772 0 0 1 4 5.845Z"
                fill="#030D45"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.257 3.493A2.841 2.841 0 0 1 10.76 2h2.478a2.84 2.84 0 0 1 2.504 1.493l1.07 1.991a.767.767 0 0 1-.32 1.04.777.777 0 0 1-1.047-.316l-1.069-1.99a1.291 1.291 0 0 0-1.138-.68H10.76a1.29 1.29 0 0 0-1.138.68l-1.069 1.99a.777.777 0 0 1-1.047.317.767.767 0 0 1-.32-1.04l1.07-1.992Z"
                fill="#030D45"
              />
            </svg>
          </v-btn>
      </template>

<v-card  class="pa-4 pt-12" rounded="lg">
    <v-row justify="center" >
        
    <svg width="32" height="32" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M16 0v6m0 2v2m-4-2V2m8 6V2m5 11H7l2 18h14zM4 13h24M13 31V16m6 15V16" fill="none" stroke="#000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>
    </v-row>
       <p class="text-center text-body-1 mt-8 mb-10">Delete Client</p>
      <v-row class="mx-0 mb-0">
      <v-btn @click="dialog = false"  width="45%" class="mx-auto" text tile small>cancel</v-btn>
      <v-btn :loading="loading"  @click="deleteClient" width="45%" class="mx-auto" outlined color="red"  small tile>Delete</v-btn>
      </v-row>
</v-card>
      
    </v-dialog>
</template>

<script>

import gql from "graphql-tag";
export default {
    props:{
        clientId:{
            type:String,
            require:true
        }
    },
    data(){
        return{
            dialog:false,
            loading:false
        }
    },
    methods:{
  deleteClient() {
    this.loading = true
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation deleteClient($id: ID!) {
            deleteClient(id: $id) 
          }
        `,
        // Parameters
        variables: {
            id:this.clientId
        },
        // Update the cache with the result
        // The query will be updated with the optimistic response
        // and then with the real result of the mutation
        update: (store, { data: { deleteClient } }) => {
      //   // Read the data from our cache for this query.
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
        const clients = data.getAllClients.filter(client=>client._id !== this.clientId)
        // Add our tag from the mutation to the end
        // We don't want to modify the object returned by readQuery directly:
        // https://www.apollographql.com/docs/react/caching/cache-interaction/
        store.writeQuery({ query: GET_ALL_CLIENTS, data:{...data,getAllClients:clients} })
        // Write our data back to the cache.
      },
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly and the user be happy
      }).then((data)=>{
        this.loading = false
        this.dialog = false
        this.$emit('deleted')

      }).catch((error)=>{
        this.loading = false
        console.log(error)
      });
    }
    }

}
</script>

<style>

</style>