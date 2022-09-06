<template>
  <v-dialog
    v-model="dialog"
    class="rounded-xl"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on" class="d-flex align-center">
        <v-icon small class="me-2">mdi-eye</v-icon>
        
        {{ `${client.firstName} ${client.lastName}` }}
      </span>
    </template>
    <v-card class="pb-14 pt-8" rounded="xl" outlined>
      <v-row class="mx-10" justify="end">
        <v-btn icon @click="dialog = false" outlined class="mb-8 mt-8 mt-sm-0">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-card
        height="100px"
        width="100px"
        color="#edeff2"
        flat
        rounded="pill"
        class="mx-auto d-flex justify-center lighten-3 align-center"
      >
       <v-avatar color="red" size="80">
      <span class="white--text text-h5">{{client.firstName.slice(0,1) + ' ' + client.lastName.slice(0,1)}}</span>
    </v-avatar>
        <!-- <span>
          <v-img
            width="90px"
            class="mx-auto rounded-pill"
            height="90px"
            src="https://media.istockphoto.com/photos/headshot-portrait-of-smiling-male-employee-in-office-picture-id1309328823?k=20&m=1309328823&s=612x612&w=0&h=RqA2lYygvOxisNPp6UwFjz7bCw_rYITJMqFTMSrhpis="
            alt=""
          ></v-img>
        </span> -->
      </v-card>
      <!--  -->
      <v-card-text class="text-center text-h5">{{
        client.firstName + " " + client.lastName
      }}</v-card-text>
      <v-row class="mx-0" justify="center" v-if="clientById">
        <v-col cols="12" md="2">
          <v-card color="  py-2 px-1 text-center rounded-lg" tile flat outlined>
            <p class="mb-0 text-body-2">Age</p>
            <p class="mb-0 text-grey text-caption"> {{calculateAge(clientById.dob)}} </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card color="  py-2 px-1 text-center rounded-lg" tile flat outlined>
            <p class="mb-0 text-body-2">Date of join</p>
            <p class="mb-0 text-grey text-caption">
              {{ moment(new Date(parseInt(clientById.doj))).format("DD MMMM YYYY") }}
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card color="  py-2 px-1 text-center rounded-lg" tile flat outlined>
            <p class="mb-0 text-body-2">Date of birth</p>
            <p class="mb-0 text-grey text-caption">
              {{ moment(new Date(parseInt(clientById.dob))).format("DD MMMM YYYY") }}
            </p>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row class="mx-0 ">
        <v-col class="mx-md-10">
          <v-row justify="space-between" class="mx-0" align="center">
            <v-col cols="4">
              <span class="text-caption "> fee payments </span>
            </v-col>
            <AddPayment :client="clientById"/>
          </v-row>

          <!--  -->
          <!--  -->
          <v-row class="mx-0 mt-4   pa-2 rounded-xl grey" >
               <v-select  :items="yearList" v-model="year" dense hide-details  outlined class="col-1 mx-2 my-2 rounded-xl">
              </v-select>

          <span class="d-block text-caption  my-2 mx-auto" v-if="paymentsByClient && !paymentsByClient.length">No fee payments for  {{year}} </span>
            <v-chip
              v-for="(month,index) in paymentsByClient"
              outlined
              :key="index"
              width="100px"
              height="50px"
              class="ma-2"
            >
              <v-chip color="success" class="mr-2" x-small>{{'paid'}}</v-chip>
              {{moment().month(month.month).format('MMMM')}}
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

import AddPayment from "../components/AddPayment.vue";

import gql from "graphql-tag";
export default {
  props: {
    client: Object,
  },
  components: {
    AddPayment,
  },
    mounted(){
        let currentYear = moment().year()
        let temp = [0,1,2,3,4]
        temp.map(item=>{
        this.yearList.push(currentYear - item)
        })
    },
  data() {

    return {
      year: moment().year(),
      yearList:[],
      monthList:[],
      moment: moment,
      dialog: false,
    };
  },
  methods:{
    calculateAge(dob){
         return Math.abs(moment(new Date(parseInt(dob))).diff(moment(),'years')) 
    },
  },
  apollo: {
paymentsByClient() {
      return {
        query: gql`
          query paymentsByClient($user:ID!,$year:Int) {
            paymentsByClient(user:$user,year:$year){
              _id
              firstName
              lastName
              phone

              year
              month
              amount
            }
          }
        `,
        result() {
          this.loading  = false
        },
         fetchPolicy: 'cache-and-network',
        variables(){
          return{
          user:this.client._id,year:this.year
          }
          },
        skip(){
          return !this.client._id || !this.year
        }
      };
    },
    clientById() {
      return {
        query: gql`
          query clientById($id:ID!) {
            clientById(id:$id){
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
        `,
        result({ loading }) {
          this.loading = loading;
        },
        variables:{id:this.client._id},
        skip(){
          return !this.client._id

        }
      };
    },
  }

};
</script>
