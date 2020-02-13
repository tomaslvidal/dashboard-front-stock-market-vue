<template>
    <skeleton>
        <template
            v-slot:header
        >
        </template>
        
        <template v-if="!assert_with_aside_content">
            <router-view />
        </template>

        <template 
            :class="{
                root: current_width < 768
            }"
            v-else
        >
            <div class="col-md-3 d-none d-md-block bg-dark aside">
                <aside>
                    <router-view name="aside" />
                </aside>
            </div>

            <div class="col-md-9 col-12 bg-light content" v-if="!$store.state.Root.aside.state.open">
                <router-view name="header" />

                <main class="bg-white p-3 my-4 mx-2 rounded">
                    <div class="row">
                        <div class="col-12">
                            <h5>
                                <i :class="`${$route.meta.icon} pr-2`" />
                                
                                {{ $route.meta.title }}
                            </h5>

                            <hr>

                            <div class="row">
                                <router-view name="content" class="mt-1"/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </template>
    </skeleton>
</template>

<script>
    import Skeleton from './skeleton';

    export default {
        components: {
            Skeleton
        },
        beforeMount(){
            this.$store.dispatch('Root/STATE_ASIDE', {
                open: false
            });
        },
        computed:{
            assert_with_aside_content(){
                let routes = this.$router.options.routes;

                const motor = routes => {
                    let state = false;

                    for (let index = 0; index < routes.length; index++) {
                        if(routes[index].name === this.$store.state.Router.name){
                            state = true;
                        }
                        else if(typeof routes[index].children !== 'undefined'){
                            state = motor(routes[index].children);
                        }

                        if(state){
                            break;
                        }
                    }

                    return state;
                }

                return motor(this.$router.options.routes);
            }
        }
    }
</script>

<style scoped>
    main{
        border: 1px solid #cecece;
    }
</style>