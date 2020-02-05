<template>
    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="pesos_capital">Capital Pesos</label>

                <input class="form-control form-control-sm" type="number" name="pesos_capital" id="pesos_capital">
            </div>

            <div class="form-group">
                <label for="dollar_capital">Capital dolares</label>

                <input class="form-control form-control-sm" type="number" name="dollar_capital" id="dollar_capital">
            </div>

            <div class="form-group">
                <label for="start_date">Fecha inicial</label>

                <input class="form-control form-control-sm" type="text" name="start_date" id="start_date">
            </div>

            <div class="form-group">
                <label for="qty_months">Cantidad de meses</label>

                <input class="form-control form-control-sm" type="number" name="qty_months" id="qty_months">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>