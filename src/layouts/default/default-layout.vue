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
            class="root"
            v-else
        >
            <div class="col-xl-2 col-lg-4 col-12  bg-dark aside">
                <aside>
                    <router-view name="aside" />
                </aside>
            </div>

            <div class="col-xl-10 col-lg-8 col-md-12 bg-light content">
                <router-view name="header" />

                <main class="bg-white p-3 my-4 mx-2 rounded">
                    <router-view name="content" />
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
    main{
        border: 1px solid #cecece;
    }
</style>