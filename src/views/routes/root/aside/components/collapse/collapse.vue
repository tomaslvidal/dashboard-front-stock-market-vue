<template>
    <div class="col-12 box_filtro">
        <a 
            href="#!"
            data-toggle="collapse" 
            class="boton-wrapper btn-filter filtro_title" 
            @click.stop.prevent="model = !model"
        >
            <span>{{ title }}</span>

            <font-awesome-icon
                :icon="['fas' ,`angle-${model ? 'up' : 'down'}`]"
                fixed-width
            />
        </a>

        <b-collapse
            v-model="model"
            :class="collapseClass"
        >
            <slot />
        </b-collapse>
    </div>
</template>

<script>
    import { BCollapse } from 'bootstrap-vue';

    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

    library.add(faAngleUp, faAngleDown);

    export default {
        components: {
            BCollapse
        },
        props: {
            value: {
                default: () => true,
                type: Boolean,
                required: true
            },
            title: {
                default: () => '',
                type: String,
                required: true
            },
            'collapseClass': {
                default: () => '',
                type: String,
                required: false
            }
        },
        computed: {
            model: {
                get(){
                    return this.value;
                },
                set(val){
                    this.$emit('input', val);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';
</style>