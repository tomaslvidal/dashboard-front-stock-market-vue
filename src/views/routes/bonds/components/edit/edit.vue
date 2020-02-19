<template>
    <div class="col-12">
        <div class="form-group">
            <div>
                <span style="font-size: 17px; font-weight: 500;">
                    {{ form.instrument }}
                </span>

                <hr>
            </div>

            <div class="form-group">
                <label for="instrument">Instrumento</label>

                <select v-model="form.instrument" class="form-control" id="instrument">
                    <option value="">Seleccionar</option>

                    <option value="peso">Peso</option>

                    <option value="dollar">Dolar</option>

                    <option value="bond">Bono</option>
                </select>
            </div>

            <div v-if="form.instrument === 'bond'" class="form-group">
                <label for="name">Nombre</label>

                <input v-model="form.date" type="name" name="name" class="form-control form-control-sm" id="name">
            </div>

            <div class="form-group" v-if="form.instrument === 'bond'">
                <label for="currency">Moneda</label>

                <select v-model="form.currency" class="form-control" id="currency">
                    <option :value="undefined">Seleccionar</option>

                    <option value="peso">Peso</option>

                    <option value="dollar">Dolar</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="buy_type">Tipo de compra</label>

                <select v-model="form.type" class="form-control" id="buy_type">
                    <option value="">Seleccionar</option>

                    <option value="percentage">Porcentaje</option>

                    <option value="fixed">Fijo</option>
                </select>
            </div>

            <div class="form-group">
                <label for="execution">Ejecucion</label>

                <select v-model="form.execution" class="form-control" id="execution">
                    <option value="">Seleccionar</option>

                    <option value="monthly">Mensual</option>

                    <option value="date">Fecha</option>
                </select>
            </div>

            <div v-if="form.execution === 'date'" class="form-group">
                <label for="date">Fecha</label>

                <input v-model="form.date" type="date" name="date" class="form-control form-control-sm" id="date">
            </div>

            <div class="form-group" v-if="form.instrument === 'bond'">
                <label for="price">Precio instrumento</label>

                <input v-model="form.price" class="form-control form-control-sm" type="text" name="price" id="price">
            </div>

            <div class="form-group">
                <label for="amount">Monto</label>

                <input v-model="form.value" class="form-control form-control-sm" type="text" name="amount" id="amount">
            </div>

            <div class="row">
                <div class="col-3">
                    <button @click.stop.prevent="onSubmit" class="btn btn-sm btn-primary w-100">
                        Editar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            form(){
                return this.$store.state.Root.buy[this.$route.params.id];
            }
        },
        methods:{
            onSubmit(){
                this.$store.dispatch('Root/SET_FORM', {
                    'form': 'buy',
                    'id': this.$route.params.id,
                    'data': JSON.parse(JSON.stringify(this.form))
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>