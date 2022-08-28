<template>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
       <template v-slot:prepend>
        <v-list-item two-line class="mb-5">
          <v-list-item-avatar size="80">
              <v-img src="https://i.pinimg.com/736x/42/9d/63/429d631659a11a9eb666b103d811470a.jpg"> </v-img>
          </v-list-item-avatar>
          <v-list-item-content class="ms-n6 " style="z-index:10;">
             <v-list-item-title class=" text-h6">
              Dark Fit
              </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
     <v-list dense >
        <v-list-item class="py-2" link  :to="{name:'Dashboard'}">
          <v-list-item-icon>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path data-name="home-Regular" d="m19.978 7.313-5-4.019a4.783 4.783 0 0 0-5.956 0l-5 4.019a4.722 4.722 0 0 0-1.772 3.7V17A4.753 4.753 0 0 0 7 21.746h2.75V17a2.25 2.25 0 0 1 4.5 0v4.745H17A4.753 4.753 0 0 0 21.75 17v-5.991a4.722 4.722 0 0 0-1.772-3.696ZM20.25 17A3.251 3.251 0 0 1 17 20.246h-1.25V17a3.75 3.75 0 0 0-7.5 0v3.245H7A3.251 3.251 0 0 1 3.75 17v-5.991a3.228 3.228 0 0 1 1.211-2.527l5-4.019a3.277 3.277 0 0 1 4.078 0l5 4.019a3.228 3.228 0 0 1 1.211 2.527Z" style="fill:#41416e"/></svg>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="py-2" link  :to="{name:'Clients'}">
          <v-list-item-icon>
            <svg width="24" height="24" viewBox="0 -0.08 20 20" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg"><path d="M12.41 9.06a3 3 0 1 0-4.82 0 6.55 6.55 0 0 0-3.74 6 .38.38 0 1 0 .75 0A5.6 5.6 0 0 1 10 9.29a5.6 5.6 0 0 1 5.4 5.77.38.38 0 1 0 .75 0 6.55 6.55 0 0 0-3.74-6Zm-4.09-.27a2.21 2.21 0 1 1 3.89-1.43 2.16 2.16 0 0 1-.5 1.4 5.8 5.8 0 0 0-3.37 0Z"/></svg>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Clients</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

       <v-list-item class="py-2" link  :to="{name:'Reports'}">
          <v-list-item-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 42 32" xml:space="preserve"><path fill="#828282" d="M39 0c-1.654 0-3 1.346-3 3 0 .888.396 1.679 1.011 2.229l-8.8 14.031A2.972 2.972 0 0 0 27 19c-.868 0-1.644.376-2.193.967l-9.073-5.745c.168-.374.266-.786.266-1.222 0-1.654-1.346-3-3-3s-3 1.346-3 3c0 .904.41 1.706 1.044 2.256L4.149 26.231A2.972 2.972 0 0 0 3 26c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3c0-.888-.395-1.678-1.01-2.228l6.904-10.99c.343.138.715.218 1.106.218.859 0 1.629-.367 2.176-.947l9.078 5.748A2.981 2.981 0 0 0 24 22c0 1.654 1.346 3 3 3s3-1.346 3-3c0-.863-.371-1.636-.957-2.184l8.81-14.046c.354.147.741.23 1.147.23 1.654 0 3-1.346 3-3s-1.346-3-3-3zM5 29c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm8-14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm14 9c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM39 5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/></svg>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Reports</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
       
      <!--  -->
    </v-navigation-drawer>
</template>
<script>
  export default {
    props:{
        drawer:{
            type:Boolean
        }
    },
  }
</script>