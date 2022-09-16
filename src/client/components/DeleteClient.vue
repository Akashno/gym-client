<template>
      <v-dialog
      v-model="dialog"
      width="500"
      class="rounded-lg"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn  icon outlined color="red" v-on="on" v-bind="attrs">
          <v-icon >mdi-delete-outline</v-icon>
            
          </v-btn>
      </template>

<v-card  class="pa-4 pt-12" rounded="lg" outlined>
    <v-row justify="center" >
      <v-icon large>mdi-delete-outline</v-icon>
        
    </v-row>
       <p class="text-center text-body-1 mt-8 mb-10">Delete Client</p>
      <v-row class="mx-0 mb-0">
      <v-btn @click="dialog = false"  width="45%" class="mx-auto" text tile >cancel</v-btn>
      <v-btn :loading="loading"  @click="deleteClient" width="45%" class="mx-auto" outlined color="red"   tile>Delete</v-btn>
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
        const CLIENTS  = gql`
          query clients($input: PageInput!, $filter: FilterInput) {
            clients(input: $input, filter: $filter) {
              _id
              firstName
              lastName
              phone
              email
              gender
              dob
              isActive
              doj
            }
          }
        `
            let variables = { input: { limit: 10, skip: 0 },filter:{search:""} };
        const data = store.readQuery({ query: CLIENTS ,variables})
        const clients = data.clients.filter(client=>client._id !== this.clientId)
        // Add our tag from the mutation to the end
        // We don't want to modify the object returned by readQuery directly:
        // https://www.apollographql.com/docs/react/caching/cache-interaction/
        store.writeQuery({ query: CLIENTS, data:{...data,clients:clients},variables })
        // Write our data back to the cache.
      },
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly and the user be happy
      }).then(()=>{
        this.$store.commit('setSnackBar',{color:'success',text:'Client Deleted Successfully'})
        this.loading = false
        this.dialog = false
        this.$emit('deleted')

      }).catch(()=>{
        this.$store.commit('setSnackBar',{color:'error',text:'Something Went wrong'})
        this.loading = false
      });
    }
    }

}
</script>

<style>

</style>