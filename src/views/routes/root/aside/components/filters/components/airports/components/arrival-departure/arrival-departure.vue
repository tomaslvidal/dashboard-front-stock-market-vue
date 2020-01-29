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

        <div>
            <egress-finish 
                v-for="(name_type, index_type) in types"
                :key="index_type"
                :type_parent="type"
                :type="name_type"
            />
        </div>
    </div>
</template>

<script>
    import { EgressFinish } from './components';

    export default {
        components: {
            EgressFinish
        },
        props: {
            type: {
                default: () => '',
                type: String,
                required: true,
            }
        },
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
            types(){
                return Object.keys(this.$store.state.Step2.filter.airport[this.type]);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles/checker-h4';
</style>
