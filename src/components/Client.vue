<template>
  <v-dialog
    v-model="dialog"
    :overlay-opacity="$vuetify.theme.dark ? '1':'0.9'"
    class="rounded-xl"
    width="800px"
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
        <v-btn icon @click="dialog = false" outlined class="mb-8 mt-8 mt-md-0">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-card
        height="100px"
        width="100px"
        color="grey"
        flat
        rounded="pill"
        class="mx-auto d-flex justify-center lighten-3 align-center"
      >
       <v-avatar color="red" size="80">
      <span class="white--text text-h5">{{client.firstName.slice(0,1) + ' ' + client.lastName.slice(0,1)}}</span>
    </v-avatar>
      </v-card>
      <v-card-text v-if="clientById" class="text-center text-h5">{{
        clientById.firstName + " " + clientById.lastName
      }}</v-card-text>
      <v-row class="mx-0" justify="center" v-if="clientById">
        <v-col cols="12" md="2">
          <v-card color="  py-2 px-1 text-center rounded-lg" tile flat outlined>
            <p class="mb-0 text-body-2">Age</p>
            <p class="mb-0 text-grey text-caption"> {{calculateAge(clientById.dob)}} </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="  py-2 px-1 text-center rounded-lg" tile flat outlined>
            <p class="mb-0 text-body-2">Date of join</p>
            <p class="mb-0 text-grey text-caption">
              {{ moment(new Date(parseInt(clientById.doj))).format("DD MMMM YYYY") }}
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="  py-2 px-1 text-center rounded-lg" tile flat outlined>
            <p class="mb-0 text-body-2">Date of birth</p>
            <p class="mb-0 text-grey text-caption">
              {{ moment(new Date(parseInt(clientById.dob))).format("DD MMMM YYYY") }}
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="text-md-left text-center  py-2 ps-2 text-left  rounded-lg" tile flat outlined>
      <v-menu
            open-on-hover
            transition="slide-y-transition"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <div  v-bind="attrs" v-on="on">
                  <p class="mb-0 text-body-2"> <v-icon small class="me-2">mdi-phone</v-icon> {{clientById.phone}}</p>
                  <p class="mb-0 text-grey text-caption" ><v-icon small class="me-2">mdi-mail</v-icon>
                  
                 <span v-if="clientById.email"> {{clientById.email}}</span>
                 <span v-else class="text-caption text--disabled ">Email not found</span>
                  
                   </p>
              </div>
            </template>
            <v-list>
                 <a :href="`https://api.whatsapp.com/send?phone=91${clientById.phone}`" class="text-decoration-none" style="color:inherit"
          target="_blank"
                  >
            <v-list-item  dense link>
                <v-list-item-title>
                  <v-icon small class="me-2">mdi-whatsapp</v-icon>
                  <span class="text-caption">whatsapp</span>
                </v-list-item-title>
              </v-list-item>

                 </a>
               <a :href="`tel:+91${clientById.phone}`" class="text-decoration-none" style="color:inherit">
            <v-list-item  dense link>
                <v-list-item-title>
                  <v-icon small class="me-2">mdi-phone</v-icon>
                  <span class="text-caption">Call </span>
                </v-list-item-title>
              </v-list-item>

                 </a>
                 <a :href="`sms:+91${clientById.phone}`" class="text-decoration-none  " style="color:inherit">
              <v-list-item  dense link >
                <v-list-item-title>
                  <v-icon small class="me-2">mdi-message-processing</v-icon>
                  <span class="text-caption">text message</span>
                </v-list-item-title>
              </v-list-item>
                 </a>
                 <a :href="`mailto:${clientById.email}`" class="text-decoration-none " style="color:inherit">
             <v-list-item  dense v-if="clientById.email" link>
                <v-list-item-title>
                  <v-icon small class="me-2">mdi-mail</v-icon>
                  <span class="text-caption">send email</span>
                </v-list-item-title>
              </v-list-item>
                 </a>
            </v-list>
          </v-menu>
            <!-- menu -->
             
            <!--  -->
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="mt-3 mb-6"></v-divider>
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

          <v-card flat tile class="transparent rounded-xl grey" min-height="200px">

          <v-row class="mx-0 mt-3   pa-2 " >
               <v-select   :items="yearList" v-model="year" dense hide-details  outlined class="col-1 mx-2 my-2 rounded-xl">
              </v-select>

          <span class="d-block text-caption mt-4  mb-2 mx-auto" v-if="!payments.length">No fee payments for  {{year}} </span>
            <v-chip
              v-for="(payment,index) in payments"
              outlined
              :key="index"
              width="100px"
              height="50px"
              class="ma-2 ps-0 pe-4 "
              title="Fee Paid"
            >
            <v-card color="green" class="px-2 py-3 me-2">{{payment.amount}}</v-card>
              {{moment().month(payment.month).format('MMMM')}}
            </v-chip>
          </v-row>
          </v-card>
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
  computed:{
    payments(){
      if(!this.clientById) return []
      let payments =  this.clientById.payments.filter((payment)=>payment.year === this.year)
      return payments 
    }

  },
  methods:{
    calculateAge(dob){
         return Math.abs(moment(new Date(parseInt(dob))).diff(moment(),'years')) 
    },
  },
  apollo: {
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
              payments{
                year
                month
                amount
              }
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
