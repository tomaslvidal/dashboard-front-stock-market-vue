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
                <label for="currency">Moneda</label>

                <select v-model="form.instrument" class="form-control" id="currency">
                    <option value="">Seleccionar</option>

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
                return Object.assign({}, this.$store.state.Root.buy[this.$route.params.id]);
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