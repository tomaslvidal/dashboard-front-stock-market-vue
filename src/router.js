import Vue from "vue";

// import store from './store';

import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: "/",
    routes: [
        {
            path: "/",
            name: "config",
            components: {
                header: require('@/views/components').Header,
                content: require('@/views/routes/config').default,
                aside: require('@/views/components').Aside,
            },
            meta: {
                title: 'Configuración',
                icon: 'fas fa-tools',
            }
        },
        {
            path: "/buy",
            name: "buy",
            components: {
                header: require('@/views/components').Header,
                content: require('@/views/routes/buy').default,
                aside: require('@/views/components').Aside,
            },
            meta: {
                title: 'Comprar',
                icon: 'fas fa-shopping-basket',
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