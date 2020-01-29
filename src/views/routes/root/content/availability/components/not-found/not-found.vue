<template>
    <div>
        <div class="error_container">
            <div class="bg">
                <div class="title_container">
                    <h2>No se encontraron resultados</h2>
                    <p>Por favor intente con otra búsqueda</p>
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
    @keyframes img {
        0%{

            }
        100%{
              -webkit-filter: grayscale(1);
             filter: grayscale(0.9);

        }
    }
    .error_container{
        border-radius: 4px;
        border: 1px solid #efefef;
        background: url('notfound.jpg') no-repeat center;
        height: 200px;
        position: relative;
        animation: img 5s alternate infinite;
    }
    .error_container  h2{
        font-size: 1.8em;
    }
    .title_container {
        color: white;
        text-align: center;
        z-index: 99;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .bg{
        position: absolute;
        background: #5f5f5fa8;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    @media (max-width: 480px){
        .error_container  h2{
            font-size: 1.2em;
        }
        .title_container{
            width: 100%;
        }
    }
    
</style>