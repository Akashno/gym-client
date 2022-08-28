<template>
  <div>
    <v-btn outlined icon small @click="rightDrawer = true">
      <slot name="icon"> </slot>
    </v-btn>
    <v-navigation-drawer
      :width="$vuetify.breakpoint.smAndDown ? '100%' : '800px'"
      temporary
      hide-overlay
      app
      absolute
      right
      v-model="rightDrawer"
      class="pa-10"
    >
      <v-row class="mt-2">
        <v-col cols="12" class="d-flex justify-space-between align-center">
          <span class="text-h6 grey--text">Edit Client</span>
          <v-btn icon @click="rightDrawer = false" outlined>
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <slot name="content"> </slot>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightDrawer: false,
    };
  },
};
</script>

<style></style>
