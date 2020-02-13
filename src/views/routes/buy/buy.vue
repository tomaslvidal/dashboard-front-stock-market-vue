<template>
    <div class="col-12">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>

                    <th scope="col" />

                    <th scope="col">First</th>

                    <th scope="col">Last</th>

                    <th scope="col">Handle</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th scope="row">1</th>

                    <th>
                        <div class="row changes">
                            <div class="px-2">
                                <router-link
                                    :to="{
                                        name: 'buy_id',
                                        params: {
                                            id: 2
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

                    <td>Mark</td>

                    <td>Otto</td>

                    <td>@mdo</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
    div.changes i{
        font-weight: 500;
        cursor: pointer;
    }
</style>