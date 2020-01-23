import Vue from "vue";

import store from './store';

import Router from "vue-router";

import { jsonParseAll, forQueryString, adaptGet } from '@/methods';

Vue.use(Router);

const toStep2OrSearcher = next => {
    if(store.getters['Step2/rates'].length>0){
        next({ name: 'step2', query: forQueryString(JSON.parse(JSON.stringify(store.state.Step2.search))) });
    }
    else{
        parent.location.replace(store.getters['Step2/url_redirect_for_error']);
    }
};

let router = new Router({
    mode: "history",
    base: "/motor/",
    routes: [
        {
            path: "/",
            name: "step2",
            components: {
                header: require('@/views/routes/step2').Header,
                content: require('@/views/routes/step2').Content,
                aside: require('@/views/routes/step2').Aside,
                mobile: require('@/views/routes/step2').Mobile
            },
            beforeEnter: async (to, from, next) => {
                if(!store.state.Step2.request_made.availability || (from.name !== "step3" && from.name !== "step5")){
                    if(Object.keys(to.query).length>0){
                        let $_GET = jsonParseAll(to.query), use_adapt = false;

                        if(typeof $_GET.airOrigen !== 'undefined'){
                            $_GET = adaptGet($_GET);

                            use_adapt = true;
                        }

                        store.dispatch('Step2/SET_SEARCH', $_GET);

                        next();

                        if(use_adapt){
                            window.history.pushState(null, null, `${window.location.origin}/motor/?${new URLSearchParams(forQueryString(JSON.parse(JSON.stringify($_GET)))).toString()}`);
                        }
                    }
                    else{
                        parent.location.replace(store.getters['Availability/url_redirect_for_error']);
                    }
                }
                else{
                    if(Object.keys(to.query).length>0){
                        store.dispatch('Step2/STEP3_TO_STEP5_FORCE_RESET');

                        next();
                    }
                    else{
                        parent.location.replace(store.getters['Availability/url_redirect_for_error']);
                    }
                }
            }
        },
        {
            path: "/step3",
            name: "step3",
            components: {
                default: require('@/views/routes/step3').default,
                header: require('@/views/components').Headers.One
            },
        },
        {
            path: "/step5",
            name: "step5",
            components: {
                default: require('@/views/routes/step5').default,
                header: require('@/views/components').Headers.One
            },
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