<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script>
    import '@/styles/global';

    const default_layout = "default";

    export default {
        computed: {
            layout() {
                return (this.$route.meta.layout || default_layout) + "-layout";
            }
        }
    };
</script>

<style>
    *{
        outline: 0!important;
    }
</style>