<template>
    <collapse
        v-model="state.collapse"
        title="Aeropuertos"
        collapse-class="aeropuertos_checker"
    >
        <div class="checker show collapse container-fluid toggle-container">
            <arrival-departure 
                v-for="(key, index) in types"
                :key="index"
                :type="key"
            />
        </div>
    </collapse>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons';

    library.add(faPlaneDeparture, faPlaneArrival);
    
    import Collapse from '@/views/routes/step2/aside/components/collapse';

    import { ArrivalDeparture } from './components';

    export default {
        components: {
            Collapse,
            ArrivalDeparture
        },
        data(){
            return({
                state: {
                    collapse: false
                },
            });
        },
        computed: {
            types(){
                return Object.keys(this.$store.state.Step2.filter.airport).filter(item => item !== 'state');
            }
        }
    }
</script>