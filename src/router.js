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
            name: "index",
            components: {
                header: require('@/views/routes/index').Header,
                content: require('@/views/routes/index').Content,
                aside: require('@/views/routes/index').Aside,
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