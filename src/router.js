import Vue from "vue";

import store from './store';

import Router from "vue-router";

import { jsonParseAll, forQueryString, adaptGet } from '@/methods';

Vue.use(Router);

const toStep2OrSearcher = (next, remake_search = false) => {
    let check_set_search = false;

    if(JSON.stringify(store.getters['Step2/search_default']) !== JSON.stringify(store.state.Step2.search)){
        check_set_search = true;
    }

    if((store.getters['Step2/rates'].length > 0 || remake_search) && check_set_search){
        return next({ name: 'step2', query: forQueryString(JSON.parse(JSON.stringify(store.state.Step2.search))), params: { remake_search: remake_search  } });
    }

    parent.location.replace(store.getters['Step2/url_redirect_for_error']);
};

const router = new Router({
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
                if(!store.state.Step2.request_made.availability || to.params.remake_search || (from.name === null && typeof to.params.remake_search === 'undefined')){
                    if(Object.keys(to.query).length>0){
                        let $_GET = jsonParseAll(to.query), use_adapt = false;

                        if(typeof $_GET.airOrigen !== 'undefined'){
                            $_GET = await adaptGet($_GET);

                            use_adapt = true;
                        }

                        await store.dispatch('Step2/SET_SEARCH', $_GET);

                        next();

                        if(use_adapt){
                            next({
                                name: 'step2',
                                replace: true,
                                query: forQueryString(JSON.parse(JSON.stringify($_GET)))
                            });
                        }

                        return;
                    }
                    else{
                        parent.location.replace(store.getters['Availability/url_redirect_for_error']);
                    }
                }

                store.dispatch('Step2/STEP3_TO_STEP5_FORCE_RESET');

                return next();
            }
        },
        {
            path: "/step3",
            name: "step3",
            components: {
                default: require('@/views/routes/step3').default,
                header: require('@/views/components').Headers.One
            },
            beforeEnter(to, from, next){
                if(Object.keys(store.getters['Step3/rate']).length > 0 && !store.state.Step5.state.email_sent){
                    return next();
                }

                toStep2OrSearcher(next, from.name === null && !store.state.Step2.request_made.availability);
            }
        },
        {
            path: "/step5",
            name: "step5",
            components: {
                default: require('@/views/routes/step5').default,
                header: require('@/views/components').Headers.One
            },
            beforeEnter(to, from, next){
                if(typeof store.state.Step3.data.book.codigo !== 'undefined'){
                    return next();
                }

                toStep2OrSearcher(next, from.name === null && !store.state.Step2.request_made.availability);
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