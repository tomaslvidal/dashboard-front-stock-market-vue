<template>
    <div>
        <h3
            :class="{
                'd-none' : disable_mobile
            }"
        >
            Ordenar
        </h3>

        <price />

        <stopovers />

        <duration />
    </div>
</template>

<script>
    import { Price, Stopovers, Duration } from './components';

    export default {
        components: {
            Price,
            Stopovers,
            Duration
        },
        props:{
            disable_mobile: {
                default: () => false,
                type: Boolean,
                required: false
            }
        }
    }
</script>
<style lang="scss" scoped>
    h3{
        font-size: 1.25rem;
    }
</style>