<template>
    <div class="n-checker">
        <h4>
            <font-awesome-icon
                :icon="['fas', 'plane-departure']"
                class="mr-2"
                fixed-width
            />

            {{ name }}
        </h4>

        <div
            v-for="(item_stopover, index) in filter.items"
            :key="index"
            class="custom-control custom-checkbox row"
        >
            <input
                :id="`${type}-${index}-${_uid}`"
                type="checkbox"
                :name="`${type}_stopovers[]`"
                v-model="filter.selected"
                :value="item_stopover.value"
                class="custom-control-input col-1"
                @click="setInitPagination()"
            >
            
            <label
                :for="`${type}-${index}-${_uid}`"
                class="custom-control-label col-11 aero_label"
            >
                <span>{{ `${item_stopover.name}` }}</span>
            </label>
        </div>
    </div>
</template>

<script>
    
    import Mixins from '../../../../mixins';

    export default {
        props: {
            type: {
                default: () => '',
                type: String,
                required: true,
            }
        },
         mixins:[
            Mixins
        ],
        computed: {
            name(){
                switch (this.type) {
                    case 'arrival':
                        return 'IDA';
                    case 'departure':
                        return 'VUELTA';
                    default:
                        return '';
                }
            },
            filter(){
                return this.$store.state.Step2.filter.stopover[this.type];
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
</style>