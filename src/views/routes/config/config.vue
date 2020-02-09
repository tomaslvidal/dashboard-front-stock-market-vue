<template>
    <div class="col-12">
        <div class="form-row">
            <div class="form-group col-6">
                <label for="pesos_capital">Capital Pesos</label>

                <input v-model="form.pesos_capital" class="form-control form-control-sm" type="number" name="pesos_capital" id="pesos_capital">
            </div>

            <div class="form-group col-6">
                <label for="dollar_capital">Capital dolares</label>

                <input v-model="form.dollar_capital" class="form-control form-control-sm" type="number" name="dollar_capital" id="dollar_capital">
            </div>
        </div>

        <div class="form-group">
            <label for="start_date">Fecha inicial</label>

            <input v-model="form.start_date" class="form-control form-control-sm" type="text" name="start_date" id="start_date">
        </div>

        <div class="form-group">
            <label for="qty_months">Cantidad de meses</label>

            <input v-model="form.qty_months" class="form-control form-control-sm" type="number" name="qty_months" id="qty_months">
        </div>

        <div class="form-group">
            <label for="dollar_prognosis">Dolar pronostico</label>

            <input v-model="form.dollar_prognosis" id="dollar_prognosis" class="form-control form-control-sm" type="number" name="dollar_prognosis">
        </div>

        <div class="form-row">
            <div class="col-12">
                <label for="raise_range">Rango suba</label>
            </div>

            <div class="d-flex w-100" id="raise_range">
                <div 
                    class="form-group col-md-6"
                    v-for="(item_range, index) in form.raise_range"
                    :key="index"
                >
                    <label for="raise_range_0">
                        {{ item_range.name }}
                    </label>

                    <input v-model="item_range.value" name="raise_range[]" type="number" class="form-control form-control-sm" id="raise_range_0">
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="col-12">
                <label for="dollars_to_pesos">Dolar a pesos</label>
            </div>

            <div class="d-flex w-100 pl-3" id="dollars_to_pesos">
                <div class="form-group form-check col-12">
                    <input v-model="form.dollars_to_pesos.bonds" type="checkbox" class="form-check-input" id="bonds">

                    <label class="form-check-label" for="bonds">Bonos</label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="percentage_dollar">Porcentaje a dolar</label>

            <input v-model="form.percentage_dollar" class="form-control form-control-sm" type="number" name="percentage_dollar" id="percentage_dollar">
        </div>

        <div class="form-group">
            <legend class="col-form-label pt-0">Mensual o diario</legend>

            <div class="col-12">
                <div class="form-check">
                    <input v-model="form.monthly_or_diary" class="form-check-input" type="radio" name="monthly_or_diary" id="month" value="month" checked>

                    <label class="form-check-label" for="month">
                        Mensual
                    </label>
                </div>

                <div class="form-check">
                    <input v-model="form.monthly_or_diary" class="form-check-input" type="radio" name="monthly_or_diary" id="diary" value="diary">

                    <label class="form-check-label" for="diary">
                        Diario
                    </label>
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
                return Object.assign({}, this.$store.state.Root.config);
            }
        },
        methods:{
            onSubmit(){
                this.$store.dispatch('Root/SET_FORM', {
                    'form': 'config',
                    'data': JSON.parse(JSON.stringify(this.form))
                });
            }
        }
    }
</script>