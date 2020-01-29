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
            <aside>
                <router-view name="aside" />
            </aside>

            <main>
                <router-view name="content" />
            </main>
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