<template>
    <div class="col-12">
        <div class="form-row">
            <div class="form-group col-6">
                <label for="start_date">Fecha inicial</label>

                <input class="form-control form-control-sm" type="number" name="start_date" id="start_date">
            </div>

            <div class="form-group col-6">
                <label for="pesos_capital">T.E.A</label>

                <input class="form-control form-control-sm" type="number" name="pesos_capital" id="pesos_capital">
            </div>
        </div>

        <div class="form-row">
            <div class="col-12">
                <label for="dollars_to_pesos">Dolar a pesos</label>
            </div>

            <div class="d-flex w-100 pl-3" id="dollars_to_pesos">
                <div class="form-group form-check col-12">
                    <input type="checkbox" class="form-check-input" id="detector">

                    <label class="form-check-label" for="detector">Detector</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>