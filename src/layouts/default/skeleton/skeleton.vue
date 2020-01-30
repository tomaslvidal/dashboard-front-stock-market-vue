<template>
    <div class="container root d-flex flex-grow-1 flex-column">
        <slot
            name="header"
        />

        <div class="row root">
            <slot />

            <scrollarrow />
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    // import { fas } from '@fortawesome/free-solid-svg-icons';

    // import { fab } from '@fortawesome/free-brands-svg-icons';

    import { faHandPointUp } from '@fortawesome/free-regular-svg-icons';

    import { Scrollarrow } from '@/components';

    library.add(faHandPointUp);

    export default{
        components: {
            Scrollarrow
        }
    }
</script>

<style scoped>
    .content{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-between;
    }

    .container-fluid {
        max-width: 1300px;
    }

    .top-header {
        background: #dedede;
        padding: 10px;
        font-size: 22px;
    }

    footer{
        color: gray;
    }
</style>

<style>
    .filtro_title{
        color: #4c4a4a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        font-size: 1em;
        font-weight: 700;
    }

    .filtro_title svg{
        font-size: 1.3em;
    }

    a:hover{
        color: #0056b3!important;
        text-decoration: none;
    }

    label:hover{
        cursor: pointer;
    }

    .logo{
        width: 25px;
    }

    .aero_label{
        display: flex;
        align-items: center;
    }

    .aero_label img{
        margin-right: 4px;
    }

    .main{
        background: #fff;
        border-radius: 4px;
        -webkit-box-shadow: -1px 4px 4px -4px rgba(0,0,0,0.75);
        -moz-box-shadow: -1px 4px 9px -4px rgba(0,0,0,0.75);
        box-shadow: -1px 4px 4px -4px rgba(0,0,0,0.75);
        margin-bottom: 20px; 
    }

    h1 {
        font-size: 1.5em;
        margin: 0;
        color: #4c4a4a;
    }
</style>