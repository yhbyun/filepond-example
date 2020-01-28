import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
      store(context, formData) {
        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }
        return new Promise((resolve, reject) => {
          axios.post('/api/products', formData, config)
            .then(response => {
              console.log(response.data)
              resolve()
            })
            .catch(error => reject())
        })
      },
    },
});
