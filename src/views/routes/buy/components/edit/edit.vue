<template>
    <div class="col-12">
        <div class="form-group">
            <div>
                <span style="font-size: 17px; font-weight: 500;">Pesos</span>

                <hr>
            </div>

            <div class="form-group">
                <label for="currency">Moneda</label>

                <select class="form-control" id="currency">
                    <option>Pesos</option>

                    <option>Dolares</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="buy_type">Tipo de compra</label>

                <select class="form-control" id="buy_type">
                    <option>Porcentaje</option>

                    <option>Fijo</option>
                </select>
            </div>

            <div class="form-group">
                <label for="amount">Monto</label>

                <input class="form-control form-control-sm" type="text" name="amount" id="amount">
            </div>

            <div class="row">
                <div class="col-3">
                    <button class="btn btn-sm btn-primary w-100">
                        Editar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>