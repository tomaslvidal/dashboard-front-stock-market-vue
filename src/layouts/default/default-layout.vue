<template>
    <skeleton>
        <template
            v-slot:header
        >
            <router-view name="header" />
        </template>
        
        <template v-if="!assert_with_aside_content">
            <router-view />
        </template>

        <template v-else>
            <aside 
                :class="{
                    'col-xl-3': $store.state.Step2.request_made.availability,
                    'col-12': true,
                    'p-xl-0': true,
                    'filtros_container': true
                }"
            >
                <router-view name="aside" />
            </aside>

            <main
                :class="{
                    'col-xl-9': $store.state.Step2.request_made.availability,
                    'col-12': true,
                    'pr-lg-0': $store.state.Step2.request_made.availability,
                    'p-0': !$store.state.Step2.request_made.availability && !mobile_size,
                    'px-3': !$store.state.Step2.request_made.availability && mobile_size
                }"
            >
                <router-view name="content" />
            </main>

            <router-view name="mobile" />
        </template>
    </skeleton>
</template>

<script>
    import Skeleton from './skeleton';

    export default {
        components: {
            Skeleton
        },
        data(){
            return{
                components: {}
            };
        },
        computed:{
            assert_with_aside_content(){
                let components = this.$router.options.routes.filter(item => item.path === this.$store.state.Router.path)[0].components;

                if(typeof components.aside !== 'undefined' && typeof components.content !== 'undefined'){
                    return true;
                }

                return false;
            }
        }
    }
</script>

<style scoped>
     @media (max-width: 991px){
       .filtros_container
        {
            margin: 0;
            position: fixed;
            background: #fff;
            left: -2000px;
            z-index: 11;
            top: 0;

        }	
    }
</style>