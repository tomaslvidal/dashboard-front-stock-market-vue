<template>
    <div class="mt-md-4">
        <h3
            :class="{
                'd-none' : disable_mobile
            }"
        >
            Filtrar
        </h3>

        <price />

        <schedule />

        <stopovers />

        <airlines />

        <airports />
    </div>
</template>

<script>
    import { Price, Schedule, Stopovers, Airlines, Airports } from './components';
    
    export default {
        components: {
            Price,
            Schedule,
            Stopovers,
            Airlines,
            Airports
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