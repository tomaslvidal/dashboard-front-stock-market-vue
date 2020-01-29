<template>
    <collapse
        v-model="state.collapse"
        title="Escalas"
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
    import Collapse from '@/views/routes/step2/aside/components/collapse';

    import { ArrivalDeparture } from './components';
    
    export default {
        components: {
            Collapse,
            ArrivalDeparture
        },
        data(){
            return {
                state: {
                    collapse: true
                },
            };
        },
        created(){
            if(this.collapse_filters == false){
                this.state.collapse=false;
            }else{
                this.state.collapse=true
            }
        },
        watch: {
            'collapse_filters': function(val){
                if(!val){
                    this.state.collapse=false
                }else{
                     this.state.collapse=true
                }
            }
        },
        computed: {
            types(){
                return Object.keys(this.$store.state.Step2.filter.stopover).filter(item => item !== 'state');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
</style>