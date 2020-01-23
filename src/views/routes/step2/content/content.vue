<template>
    <div>
        <loading
            v-if="!$store.state.Step2.request_made.availability "
            :progress="progress_loading"
        />

        <availability v-if="$store.state.Step2.request_made.availability" />
    </div>
</template>

<script>
    import { Loading } from '@/components';
    
    import Availability from './availability';

    export default {
        components: {
            Loading,
            Availability
        },
        computed:{
            progress_loading(){
                return this.$store.getters['Step2/progress_availability'];
            }
        }
    }
</script>