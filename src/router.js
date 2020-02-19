import Vue from "vue";

// import store from './store';

import Router from "vue-router";

import $ from 'jquery';

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
            pathToRegexpOptions: {
                strict: false
            },
            components: {
                header: require('@/views/components').Header,
                content: {
                    template: '<router-view />'
                },
                aside: require('@/views/components').Aside,
            },
            meta: {
                title: 'Comprar',
                icon: 'fas fa-shopping-basket',
            },
            children: [
                {
                    path: '',
                    name: 'buy',
                    component: require('@/views/routes').Buy,
                    meta: {
                        title: 'Comprar',
                        icon: 'fas fa-shopping-basket',
                    },
                },
                {
                    path: ':id',
                    name: 'buy_id',
                    component: require('@/views/routes/buy').Components.Edit,
                    meta: {
                        title: 'Editar compra - ',
                        icon: 'far fa-edit',
                    },
                }
            ]
        },
        {
            path: "/bonds",
            pathToRegexpOptions: {
                strict: false
            },
            components: {
                header: require('@/views/components').Header,
                content: {
                    template: '<router-view />'
                },
                aside: require('@/views/components').Aside,
            },
            meta: {
                title: 'Comprar',
                icon: 'fas fa-shopping-basket',
            },
            children: [
                {
                    path: '',
                    name: 'bonds',
                    component: require('@/views/routes').Bonds,
                    meta: {
                        title: 'Bonos',
                        icon: 'fas fa-shopping-basket',
                    },
                },
                {
                    path: ':id',
                    name: 'bond_id',
                    component: require('@/views/routes/bonds').Components.Edit,
                    meta: {
                        title: 'Editar bono - ',
                        icon: 'far fa-edit',
                    },
                }
            ]
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

router.afterEach((to, from) => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

export default router;