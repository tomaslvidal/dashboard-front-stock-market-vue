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
                content: require('@/views/routes').Config,
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
                content: require('@/views/routes').Buy,
                aside: require('@/views/components').Aside,
            },
            meta: {
                title: 'Comprar',
                icon: 'fas fa-shopping-basket',
            }
        },
        {
            path: "/leverage",
            name: "leverage",
            components: {
                header: require('@/views/components').Header,
                content: require('@/views/routes').Leverage,
                aside: require('@/views/components').Aside,
            },
            meta: {
                title: 'Apalancamiento',
                icon: 'fas fa-suitcase',
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