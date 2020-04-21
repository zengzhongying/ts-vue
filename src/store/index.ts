import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"
Vue.use(Vuex);
// import getters from './getters'
export default new Vuex.Store({
  modules: {
    user
  },
  // getters,
  strict: false
});
