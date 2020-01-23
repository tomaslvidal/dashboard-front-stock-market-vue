<template>
    <datepicker
        ref="datepicker"
        v-model="model"
        v-bind="$props"
        :required="required"
        :config="_config"
        :class="dclass"
        :placeholder="placeholder"
        @on-close="() => { emitClose(); $emit('on-close') }"
        @on-open="$emit('focusin')"
        @blur="$emit('focusout')"
    />
</template>

<script>
    import Datepicker from 'vue-flatpickr-component';

    import 'flatpickr/dist/flatpickr.css';

    import ConfirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';

    import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';

    import { Spanish } from 'flatpickr/dist/l10n/es.js';

    export default {
        components: {
            Datepicker,
        },
        props: {
            dclass: {
                default: () => 'form-control',
                type: String
            },
            value: {
                default: () => '',
                type: [String, Array]
            },
            config: {
                default: () => new Object(),
                type: Object
            },
            placeholder: {
                default: () => '',
                type: String
            },
            l10n: {
                default: () => new Object(),
                type: Object,
                required: false
            }
        },
        data(){
            return({
                state: {
                    close: false
                }
            });
        },
        computed:{
            _config(){
                let locale = Spanish;

                if(Object.keys(this.l10n).length){
                    locale = this.l10n;
                }

                return Object.assign(JSON.parse(JSON.stringify(this.config), (k ,v) => {
                    if(k!=="parameters"){
                        return v;
                    }
                }),
                {
                    locale,
                    plugins: [new ConfirmDatePlugin({
                        showAlways: false,
                        confirmIcon: "",
                        confirmText: "Listo"
                    })],
                });
            },
            model: {
                get(){
                    let value = this.value;

                    if(typeof this.config.mode !== 'undefined'){
                        if(this.config.mode === 'range'){
                            if(value instanceof Array){
                                return value.join(' a ');
                            }
                        }
                    }

                    if(this.config.mode === 'single'){
                        if(value instanceof Array){
                            value = value[0];
                        }
                    }

                    return value;
                },
                set(val){
                    if(typeof this.config.mode !== 'undefined'){
                        if(this.config.mode === 'range'){
                            this.$emit('input', this.datePicker.fp.selectedDates.map(item => item.toISOString()));

                            return;
                        }
                    }

                    this.$emit('input', val);
                }
            },
            parameters(){
                return this.config.parameters;
            },
            required(){
                if(typeof this.parameters !== "undefined"){
                    if(typeof this.parameters.required !== "undefined"){
                        return this.parameters.required;
                    }
                }

                return true;
            },
            datePicker(){
                return this.$refs.datepicker;
            }
        },
        watch:{
            'value': function(){
                this.$emit('on-change', this.value);

                this.state.emit = true;
            }
        },
        created(){
            if(typeof this.config.mode !== 'undefined'){
                if(this.config.mode === 'range'){
                    this.config.defaultDate = this.value;
                }
            }
        },
        methods:{
            emitClose(){
                if(this.state.emit){
                    this.$emit('on-close');

                    this.state.close = false;
                }
            }
        }
    }
</script>

<style scoped>
    .button-datepicker{
        min-width: 46px;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        border: 1px solid #ced4da;
        background-color: #fff;
    }

    .parent-icon{
        cursor:pointer
    }

    .parent-form-group{
        min-width: 308px;
    }
</style>

<style>
    .flatpickr-input.form-control:focus{
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
        box-shadow: none;
    }

    .flatpickr-input.form-control{
        border-radius: .25rem!important;
        border-top-right-radius: 0px!important;
        border-bottom-right-radius: 0px!important;
    }
</style>