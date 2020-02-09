<template>
    <div class="col-12">
        <div class="form-row">
            <div class="form-group col-6">
                <label for="start_date">Fecha inicial</label>

                <input v-model="form.start_date" class="form-control form-control-sm" type="number" name="start_date" id="start_date">
            </div>

            <div class="form-group col-6">
                <label for="tea">T.E.A</label>

                <input v-model="form.tea" class="form-control form-control-sm" type="number" name="tea" id="tea">
            </div>
        </div>

        <div class="form-row">
            <div class="col-12">
                <label for="dollars_to_pesos">Dolar a pesos</label>
            </div>

            <div class="d-flex w-100 pl-3" id="dollars_to_pesos">
                <div class="form-group form-check col-12">
                    <input v-model="form.detector" type="checkbox" class="form-check-input" id="detector">

                    <label class="form-check-label" for="detector">Detector</label>
                </div>
            </div>
        </div>

        <hr>

        <div class="form-row">
            <div class="col-3">
                <button @click.stop.prevent="onSubmit" class="btn btn-sm btn-primary w-100">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            form(){
                return Object.assign({}, this.$store.state.Root.leverage);
            }
        },
        methods:{
            onSubmit(){
                this.$store.dispatch('Root/SET_FORM', {
                    'form': 'leverage',
                    'data': JSON.parse(JSON.stringify(this.form))
                });
            }
        }
    }
</script>