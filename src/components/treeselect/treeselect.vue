<template>
    <div>
        <treeselect
            v-model="model"
            v-bind="bind"
            @close="$emit('close')"
        />
    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect';

    import { ASYNC_SEARCH  } from '@riophae/vue-treeselect';

    import '@riophae/vue-treeselect/dist/vue-treeselect.css';

    export default {
        components: {
            Treeselect
        },
        props: {
            value: {
                default: () => undefined,
                type: Object
            },
            config: {
                default: () => new Object(),
                type: Object
            },
            items: {
                default: () => new Object(),
                type: Function
            }
        },
        computed:{
            model:{
                get(){
                    return this.value;
                },
                set(val){
                    this.$emit('input', val);
                }
            },
            bind(){
                return Object.assign(this.config, this.$attrs);
            }
        },
        created(){
            this.config = Object.assign(this.config, {
                loadOptions: async ({ action, searchQuery, callback }) => {
                    if(action === ASYNC_SEARCH) {
                        callback(null, await this.items(searchQuery));
                    }
                }
            });
        },
    }
</script>

<style scoped>

</style>