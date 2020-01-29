<template>
    <div>
        <sorts 
            v-if="$store.state.Step2.request_made.availability"
            :disable_mobile="disable_mobile"
        />
        
        <filters 
            v-if="$store.state.Step2.request_made.availability"
            :disable_mobile="disable_mobile"
        />
    </div>
</template>

<script>
    import { Filters, Sorts } from './components';

    export default {
        components: {
            Filters,
            Sorts
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