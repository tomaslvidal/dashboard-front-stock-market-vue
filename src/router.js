import Vue from "vue";

// import store from './store';

import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: "/motor/",
    routes: [
        {
            path: "/",
            name: "root",
            components: {
                header: require('@/views/routes/root').Header,
                content: require('@/views/routes/root').Content,
                aside: require('@/views/routes/root').Aside,
            }
        },
        {
            path: "*",
            name: "error",
            meta: { layout: "error" },
            component: require('@/views/routes/error').default
        }
    ]
});

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    
    next();
});

export default router;