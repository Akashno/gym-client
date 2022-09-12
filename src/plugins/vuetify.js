import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
     dark:true,
    themes: {
      light: {
        grey:"#EDEFF2",
      },
      dark: {
        grey:"#282828" },
    }, 
    }
    
});
