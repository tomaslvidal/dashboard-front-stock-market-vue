<template>
    <collapse
        v-model="state.collapse"
        title="Por escala"
    >
        <div 
            id="order_by"
            class="checker show collapse container-fluid toggle-container"
        >
            <div
                v-for="(item_sort, index_sort) in sort.options"
                :key="index_sort"
                class="custom-control custom-radio"
                @click.stop.prevent="setValue(item_sort.value)"
            >
                <input 
                    type="radio" 
                    :id="`sort-${_uid}-${index_sort}`"
                    name="order_stopovers"
                    v-model="sort.selected"
                    :value="item_sort.value"
                    class="custom-control-input"
                >

                <label 
                    class="custom-control-label" 
                    :for="`sort-${_uid}-${index_sort}`"
                >
                    {{ item_sort.text }}
                </label>
            </div>
        </div>
    </collapse>
</template>

<script>
    import Collapse from '@/views/routes/step2/aside/components/collapse';

    import Mixins from '../../../filters/mixins';

    export default {
        components: {
            Collapse
        },
        data(){
            return {
                state: {
                    collapse: false
                },
            }
        },
        mixins: [
            Mixins
        ],
        computed:{
            sort(){
                return JSON.parse(JSON.stringify(this.$store.state.Step2.sort.stopovers));
            }
        },
        methods:{
            setValue(val){
                this.setInitPagination();
                this.$store.dispatch('Step2/SET_SELECTED_SORT', {
                    sort: 'stopovers',
                    value: val === this.$store.state.Step2.sort.stopovers.selected ? 0 : val
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
</style>