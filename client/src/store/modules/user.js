import UserService from "../../services/UserService";

const state = {
    loggedIn: false,
    userInfo: {}
}

const getters = {
    authStatus: (state) => state.loggedIn,
    userInfo: (state) => state.userInfo
};

const actions = {
    async auth({ commit }, token) {
        const payload = UserService.verify(token);
        commit('setAuth', await payload);
    },
    async login({ commit }, creds) {
        const res = await UserService.login(creds);
        const { _id, name, email } = res.user;
        commit('setUser', { user: { _id, name, email } })
        return res.message;
    },
    async signup({ commit }, newUser) {
        const created = await UserService.createUser(newUser);
        const res = await UserService.login(newUser);
        const { _id, name, email } = res.user;
        commit('setUser', { user: { _id, name, email } })
        return created.message;
    },
    async logout({ commit }) {
        await UserService.logout();
        commit('setAuth', false)
    }
};

const mutations = {
    setAuth: (state, payload) => {
        state.userInfo = payload.userInfo
        state.loggedIn = payload.loggedIn
        if (!payload.loggedIn) return state.userInfo = "";
    },
    setUser: (state, { user }) => {
        state.userInfo = user;
        state.loggedIn = true;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};