<template>
    <collapse
        v-model="state.collapse"
        title="Aerolineas"
    >
        <div class="checker show collapse container-fluid toggle-container">
            <div
                v-for="(item_airline, index) in filter.items"
                :key="index"
                class="custom-control custom-checkbox row"
            >
                <input
                    :id="item_airline.codigo"
                    type="checkbox"
                    name="airlines[]"
                    :value="item_airline.codigo"
                    v-model="filter.selected"
                    class="custom-control-input col-1"
                    @click="setInitPagination()"
                >
                
                <label
                    :for="item_airline.codigo"
                    class="custom-control-label col-11 aero_label"
                >
                    <img
                        :src="`http://aereos.eviajes.online/img/airlines/${item_airline.codigo != '' ? item_airline.codigo : 'default_logo' }.png`"
                        class="logo"
                    >
                    
                    <span>
                        {{ item_airline.nombre }}
                    </span>
                </label>
            </div>
        </div>
    </collapse>
</template>

<script>
    import Collapse from '@/views/routes/step2/aside/components/collapse';
    
    import Mixins from '../../mixins';

    export default {
        components: {
            Collapse
        },
        mixins:[
            Mixins
        ],
        data(){
            return({
                state: {
                    collapse: true
                },
                airlines: {
                    value: []
                }
            });
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
            filter(){
                return this.$store.state.Step2.filter.airline;
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
</style>