<template>
  <div>
      <RightDrawer>
        <template #icon>
           <v-icon small>mdi-pencil</v-icon> 
        </template>
        <template #content>
       <v-row class="mt-6">
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model="clientInfo.firstName"
            label="First Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="" class="py-0">
          <v-text-field
            v-model="clientInfo.lastName"
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
                :value="moment(clientInfo.dob).format('DD/MM/YYYY')"
                label="Date of Birth"
                persistent-hint
                v-bind="attrs"
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="clientInfo.dob"
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
                :value="moment(clientInfo.doj).format('DD/MM/YYYY')"
                label="Date of Joining"
                persistent-hint
                v-bind="attrs"
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="clientInfo.doj"
              no-title
              @input="isDojMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row> 

        </template>
        </RightDrawer>
  </div>
</template>

<script>
import RightDrawer from '../components/RightDrawer.vue'
import moment from "moment";
export default {
  components:{
    RightDrawer,
  },
  props:{
    client:{
      type:Object
    }
  },
  mounted(){
    this.clientInfo = {...this.client}
  },
  data() {
    return {
      clientInfo:null,
      moment: moment,
      rightDrawer: false,
      isDobMenu: false,
      isDojMenu: false,
    };
  },
};
</script>

<style></style>
