<template>
    <collapse
        v-model="state.collapse"
        title="Por precio"
    >
        <div 
            id="order_by"
            class="checker show collapse container-fluid toggle-container"
        >
            <div
                v-for="(item_sort, index_sort) in sort.options"
                :key="index_sort"
                class="custom-control custom-radio"
            >
                <input 
                    type="radio" 
                    :id="`sort-${_uid}-${index_sort}`"
                    name="order_price"
                    v-model="sort.selected"
                    :value="item_sort.value"
                    class="custom-control-input"
                    @click="setInitPagination()"
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
        mixins: [
            Mixins
        ],
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
        computed:{
            sort(){
                return this.$store.state.Step2.sort.price;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
</style>