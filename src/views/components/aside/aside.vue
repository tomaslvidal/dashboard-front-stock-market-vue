<template>
    <div>
        <div class="column row">
            <div class="col-12 justify-content-center d-flex align-items-center">
                <span class="title text-center mt-3" @click="home" style="cursor: pointer">
                    <i class="fas fa-brain"></i>

                    <br>

                    SISTEMA DE SIMULACIÓN

                    <hr>
                </span>
            </div>
        </div>

        <ul class="nav flex-column my-2">
            <li class="nav-item">
                <a
                    class="nav-link active"
                    href="#"
                    @click.stop.prevent="() => $router.push({ name: 'config' })"
                >
                    <i class="fas fa-tools pr-2"></i>

                    Configuración
                </a>
            </li>

            <li class="nav-item">
                <a
                    class="nav-link active"
                    href="#"
                    @click.stop.prevent="() => $router.push({ name: 'buy' })"

                >
                    <i class="fas fa-shopping-basket pr-2"></i>

                    Comprar
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        methods: {
            home(){
                window.location.href='/';
            }
        }
    }
</script>

<style scoped>
    .column{
        min-height: 100px;
        max-height: 100px;
        background: #e64b4b;
    }

    .title{
        letter-spacing: 1px;
        font-size: 19px;
        font-weight: 400;
    }

    .nav-item{
        border-radius: 2px;
        padding: 2px;
        font-size: 15px;
        font-weight: 500;
    }
    
    .nav-item > a{
        color: #e7e7e7!important;
    }

    div.aside .nav-item:hover{
        background: rgb(77, 77, 77);
        transition: all 0.2s ease;
    }
</style>