<template>
    <div>
        <span>{{ name }}</span>

        <div
            v-for="(item_airport, index) in filter.items"
            :key="index"
            class="custom-control custom-checkbox row"
        >
            <input
                :id="`${type_parent}_${type}_${_uid}_${index}`"
                type="checkbox"
                :name="`${type_parent}_${type}_airports[]`"
                v-model="filter.selected"
                :value="item_airport.value"
                class="custom-control-input col-1"
                @click="setInitPagination()"
            >
            
            <label
                :for="`${type_parent}_${type}_${_uid}_${index}`"
                :id="`airport-${_uid}`"
                class="custom-control-label col-11 aero_label"
            >
                <span 
                    :class="{
                        'airport_blur' : getAirportClass(item_airport.name, 20)
                    }"
                >{{ `(${item_airport.value}) - ${item_airport.name}` }}</span>
            </label>
            <b-popover
                v-if="getAirportClass(item_airport.name, 20)"
                :target="`airport-${_uid}`"
                triggers="hover"
                placement="top"
            >
                {{ `(${item_airport.value}) - ${item_airport.name}` }}
            </b-popover>
        </div>
    </div>
</template>

<script>
    import Mixins from '../../../../../mixins';

    import { BPopover } from 'bootstrap-vue';

    export default {
        props: {
            type: {
                default: () => '',
                type: String,
                required: true
            },
            type_parent: {
                default: () => '',
                type: String,
                required: true
            }
        },
        components:{
            BPopover
        },
        mixins:[
            Mixins
        ],
        data(){
            return{
                 placements: [
                    'top'
                ],
            }
        },
        computed: {
            name(){
                switch (this.type) {
                    case 'egress':
                        return 'Salida';
                    case 'finish':
                        return 'Llegada';
                    default:
                        return '';
                }
            },
            filter(){
                return this.$store.state.Step2.filter.airport[this.type_parent][this.type];
            },
            airport_name(){
                return this.getAirportClass(this.item_airport.name, 20);
            }
        },
        methods:{
            getAirportClass(name, letters){
                if(name.length > letters){
                    return true;

                }else{
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
    .airport_blur {
        position: relative;
        white-space: nowrap;
        width: 220px;
        overflow: hidden;
     
    }
    .airport_blur:after{
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          z-index: 99;
          width: 20%;
          height: 100%;
          background:linear-gradient(to right, rgba(255,255,255,0) 0%, #f4f4f4 80%, #f4f4f4 100%);
          pointer-events: none;
    }
</style>