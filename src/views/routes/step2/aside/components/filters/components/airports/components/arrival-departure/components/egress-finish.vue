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
                class="custom-control-label col-11 aero_label"
            >
                <span>{{ `(${item_airport.value}) - ${item_airport.name}` }}</span>
            </label>
        </div>
    </div>
</template>

<script>
    import Mixins from '../../../../../mixins';

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
        mixins:[
            Mixins
        ],
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
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
</style>