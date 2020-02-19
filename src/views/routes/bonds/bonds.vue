<template>
    <div class="col-12">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>

                    <th scope="col" />

                    <th scope="col">Instrumento</th>

                    <th scope="col">Tipo (Fijo/Porcentaje)</th>

                    <th scope="col">Valor</th>

                    <th scope="col">Fecha de ejecucion</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(item_buy, key) in items"
                    :key="key"
                >
                    <th scope="row">{{ key }}</th>

                    <th>
                        <div class="row changes">
                            <div class="px-2">
                                <router-link
                                    :to="{
                                        name: 'buy_id',
                                        params: {
                                            id: key
                                        }
                                    }"
                                >
                                    <i class="fas fa-edit" style="color: #007bff"></i>
                                </router-link>
                            </div>

                            <div class="px-2">
                                <i class="far fa-trash-alt" style="color: #e64242"></i>
                            </div>
                        </div>
                    </th>

                    <td>{{ item_buy.instrument }}</td>

                    <td>{{ item_buy.type }}</td>

                    <td>{{ item_buy.value }}</td>

                    <td>{{ item_buy.execution === 'date' ? item_buy.date : 'Mensual' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        computed: {
            items(){
                return this.$store.state.Root.buy;
            }
        }
    }
</script>

<style lang="scss" scoped>
    div.changes i{
        font-weight: 500;
        cursor: pointer;
    }
</style>