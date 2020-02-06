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
            <div class="col-2 bg-dark aside">
                <aside>
                    <router-view name="aside" />
                </aside>
            </div>

            <div class="col-10 bg-light">
                <router-view name="header" />

                <main class="bg-white p-3 mt-4 rounded">
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
</style>