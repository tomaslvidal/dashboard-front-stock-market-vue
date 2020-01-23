<template>
    <div>
        <div
            v-for="(item, key) in options"
            :key="key"
            :class="class_switch"
        >
            <input
                :id="`${$vnode.key}-${key}-${item.value}`"
                :checked="conditionsCheckedComplete(item)"
                :value="item.value"
                type="checkbox"
                class="custom-control-input"
                :disabled="conditionsDeactivate(item)"
                @click="onClick"
                @change="onChange"
            >
            
            <label
                :id="`l-${$vnode.key}-${key}-${item.value}`"
                class="custom-control-label"
                :for="`${$vnode.key}-${key}-${item.value}`"
            >{{ number_letters_label === -1 ? item.text : (item.text.length>=number_letters_label ? `${item.text.substring(0, number_letters_label)}...` : item.text) }}</label>

            <b-tooltip
                v-if="number_letters_label!==-1 && item.text.length>=number_letters_label"
                :target="`l-${$vnode.key}-${key}-${item.value}`"
                triggers="hover"
            >
                <span>{{ typeof item.text_tooltip !== "undefined" ? item.text_tooltip : item.text }}</span>
            </b-tooltip>
        </div>
    </div>
</template>

<script>
    import BTooltip from 'bootstrap-vue/es/components/tooltip/tooltip';

    export default {
        components: {
            BTooltip
        },
        props: {
            options: {
                default: () => [],
                type: Array
            },
            value: {
                default: () => [],
                type: Array
            },
            conditionsChecked: {
                default: () => {},
                type: Function
            },
            conditionsDeactivate: {
                default: () => {},
                type: Function
            },
            actionNotAllowed: {
                default: () => true,
                type: Boolean
            },
            numberLettersLabel: {
                default: () => -1,
                type: Number,
                required: false
            },
            classSwitch: {
                default: () => 'custom-control custom-switch',
                type: String,
                required: false
            }
        },
        computed:{
            model: {
                get(){
                    return this.value;
                },
                set(val){
                    this.$emit('input', val);
                }
            }
        },
        methods: {
            conditionsCheckedComplete(item){
                const value = this.model.filter(i => i === item.value).length > 0 ? true : false;

                const value_of_method = this.conditionsChecked(item);

                return typeof value_of_method === "undefined" ? value : value_of_method;
            },
            onClick(e){
                if(this.model.length<=1 && !e.target.checked && this.action_not_allowed){
                    e.stopPropagation();

                    e.preventDefault(); 

                    this.$emit('action-not-allowed');
                }
            },
            onChange(e){
                if(e.target.checked){
                    if(this.model.filter(item => item === e.target.value).length === 0){
                        this.model.push(e.target.value);

                        this.$emit('change', e);
                    }
                }
                else{
                    if(this.model.indexOf(e.target.value)>=0){
                        this.model.splice(this.model.indexOf(e.target.value), 1);
                    }

                    this.$emit('change', e);
                }
            }
        }
    }
</script>