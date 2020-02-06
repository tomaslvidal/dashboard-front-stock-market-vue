<template>
    <div class="col-12 mt-1">
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

        <div class="form-group">
            <label for="dollar_prognosis">Dolar pronostico</label>

            <input id="dollar_prognosis" class="form-control form-control-sm" type="number" name="dollar_prognosis">
        </div>

        <div class="form-row">
            <div class="col-12">
                <label for="raise_range">Rango suba</label>
            </div>

            <div class="d-flex w-100" id="raise_range">
                <div class="form-group col-md-6">
                    <label for="raise_range_0">Desde</label>

                    <input name="raise_range[]" type="number" class="form-control" id="raise_range_0">
                </div>

                <div class="form-group col-md-6">
                    <label for="raise_range_1">Hasta</label>

                    <input name="raise_range[]" type="number" class="form-control" id="raise_range_1">
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="col-12">
                <label for="dollars_to_pesos">Dolar a pesos</label>
            </div>

            <div class="d-flex w-100 pl-3" id="dollars_to_pesos">
                <div class="form-group form-check col-12">
                    <input type="checkbox" class="form-check-input" id="bonds">

                    <label class="form-check-label" for="bonds">Bonos</label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="percentage_dollar">Porcentaje a dolar</label>

            <input class="form-control form-control-sm" type="number" name="percentage_dollar" id="percentage_dollar">
        </div>

        <div class="form-group">
            <legend class="col-form-label pt-0">Mensual o diario</legend>

            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="monthly_or_diary" id="month" value="month" checked>

                    <label class="form-check-label" for="month">
                        Mensual
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="monthly_or_diary" id="diary" value="diary">

                    <label class="form-check-label" for="diary">
                        Diario
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>