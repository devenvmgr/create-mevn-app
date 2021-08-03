import Vuex from "vuex";
import Vue from "vue";
import user from "./modules/user"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    modules: {
        user
    }
})