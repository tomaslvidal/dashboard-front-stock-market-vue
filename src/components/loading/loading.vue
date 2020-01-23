<template>
    <div class="d-flex flex-column h-100 w-100">
        <div
            class="loading m-0 p-0 rounded"
            style="overflow: hidden;"
        >
            <div id="wrapper">
                <div id="contenedor">
                    <div id="tapa">
                        <div align="center">
                            <div class="preloader-container mb-4">
                                <div class="preloader">  
                                    <img
                                        class="img-fluid  "
                                        :src="require('@/assets/img/preloader.gif')"
                                    > <br> <br>
                                </div>
                            </div>

                            <div id="information">
                                Procesando datos recibidos
                                
                                <span class="suspensivePoints" />
                            </div>

                            <div v-if="Object.keys(progress).length>0">
                                <b-progress
                                    class="mb-2"
                                >
                                    <b-progress-bar
                                        v-if="progress.value>0"
                                        :variant="progress.variant"
                                        :value="progress.value"
                                    >
                                        <span>{{ progress.label }}</span>
                                    </b-progress-bar>
                                </b-progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br> <br>

        <div class="h-100 d-flex" />
    </div>
</template>

<script>
    import { BProgress, BProgressBar } from 'bootstrap-vue'

    export default {
        components: {
            BProgress,
            BProgressBar
        },
        props: {
            progress: {
                default: () => new Object(),
                type: Object,
                required: false
            }
        }
    }
</script>

<style scoped>
    @media (min-width: 0px) and (max-width: 1199px){
        .loading{
            border: 1px solid;
        }
    }
    .preloader-container{
        width: 100%;
        background:white;
    }
    .preloader{
        max-width: 500px;
    }
    .progress{
        height: 1.1rem;
        border-radius: 0;
        font-size: 11px;
    }
    
    .loading{
        border-color: #e9ecef!important
    }

    .suspensivePoints{
        width:18px;
        display:inline-block;
        vertical-align:bottom;
    }
    .suspensivePoints:after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(5,end) 900ms infinite;
        animation: ellipsis steps(5,end) 900ms infinite;
        content: "\2026"; /* ascii code for the ellipsis character */
        width: 0px;
    }

    @keyframes ellipsis {
        to {
            width: 1.25em;
        }
    }

    @-webkit-keyframes ellipsis {
        to {
            width: 1.25em;
        }
    }
</style>