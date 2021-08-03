// For auth example, see https://github.com/vuejs/vue-router-demos/blob/master/examples/auth-flow/index.js

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from '../views/Login';
import Signup from '../views/Signup';
import Dashboard from '../views/Dashboard';
import Schedule from '../views/Schedule';
import store from "../store"

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
        {
            path: '/schedule',
            name: 'Schedule',
            component: Schedule,
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/register', '/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.user.loggedIn;
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next()
})


export default router;