<template>
    <nav class="mb-4 d-none d-md-flex a-g">
        <b-tabs
            nav-wrapper-class="content_tab_list"
            class="w-100"
        >
            <b-tab
                title-item-class="w-50 text-center"
                title="Precio por aerolineas"
            >
                <by-airline />
            </b-tab>
            
            <b-tab
                v-if="router.type_search !== 3"
                title-item-class="w-50 text-center"
                title="Precios +/- 3 días"
                :active="flex"
            >
                <price-more-less-three-days />
            </b-tab>
        </b-tabs>
    </nav>
</template>

<script>
    import { ByAirline, PriceMoreLessThreeDays } from './components';

    import { BTabs, BTab } from 'bootstrap-vue';

    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

    library.add(faAngleRight, faAngleLeft);

    export default {
        components: {
            BTabs,
            BTab,
            ByAirline,
            PriceMoreLessThreeDays
        },
        computed:{
            flex(){
                let active_status = 'active';

                if(this.$store.state.Step2.search.flex === true){
                    return true;
                }

                return false;
            }
        }
    }
</script>

<style>
    .nav-tabs .nav-link{
        color: #4c4a4a;
    }

    .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
        font-weight: 600;
        color: #9090ff;
    }

    .content_tab_list{
        border-bottom: 2px solid #9090ff;
    }

    nav.a-g *:focus{
        outline: none!important
    }

    
</style>