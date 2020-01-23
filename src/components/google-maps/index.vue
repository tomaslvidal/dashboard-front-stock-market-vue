<template>
    <google-maps-loader
        :key="count"
        class="google-map"
        :map-config="mapConfig"
        :api-config="apiConfig"
    >
        <template v-slot="{ google, map, oms, state }">
            <google-maps-marker
                v-for="marker in markers"
                :key="marker.id"
                :marker="marker"
                :google="google"
                :oms="oms"
                :map="map"
                :state="state"
                @waitSelection="(e) => { $emit('waitSelection', e)}"
                @triggerInfo="triggerInfo"
            />
        </template>
    </google-maps-loader>
</template>

<script>
    import GoogleMapsLoader from "./google-maps-loader";

    import GoogleMapsMarker from "./google-maps-marker";

    import { mapSettings } from "./constants/mapSettings";

    export default {
        components: {
            GoogleMapsLoader,
            GoogleMapsMarker
        },
        props: {
            markers: {
                default: () => new Array(),
                type: Array
            }
        },
        data() {
            return({
                apiConfig: {
                    apiKey: 'AIzaSyCnQU5LBRcxeVdmmOdGGZ7a_paVz7wGy1E',
                    language: 'es_AR'
                },
                state: {
                    infoOpen: null
                },
                count: 0
            });
        },
        computed: {
            mapConfig() {
                return ({
                    ...mapSettings,
                    center: this.mapCenter
                });
            },
            mapCenter() {
                return({
                    lat: this.markers[0].rentalLocation.locationGeocodeInfo.position.porPosition.porLatitude,
                    lng: this.markers[0].rentalLocation.locationGeocodeInfo.position.porPosition.porLongitude
                });
            }
        },
        watch: {
            'markers': function(){
                this.count++;
            }
        },
        methods:{
            triggerInfo(infoWindow){
                if(this.state.infoOpen){
                    this.state.infoOpen.close();
                }

                this.state.infoOpen = infoWindow;
            }
        }
    };
</script>

<style scoped>
    .google-map {
        height: 55vh;
        width: 100%;
        max-height: 585px;
    }
</style>

<style>
    .google-map .gm-style-iw{
        min-width: 305px;
    }
    
    .google-map .gm-style-iw-d{
        max-height: 250px!important;
        display: flex;
        justify-content: center;
        padding-right: 10px;
    }

    .google-map .gm-style-iw.gm-style-iw-c{
        max-height: 250px!important;
    }

    #googlemap .content {
        width: 255px;
    }

    #googlemap .title {
        font-size: 13px;
        font-weight: 400;
    }

    #googlemap .info {
        font-size: 13px;
    }

    #googlemap .s_shedule{
        font-size: 14px;
        font-weight: 500;
        color: #595c5f;
    }

    #googlemap .d_schedule{
        margin-top: 2px;
    }

    #googlemap .office_select{
        font-size: 13px;
        width: 95%;
        height: 30px;
    }

    #googlemap .office_select_d{
        min-height: 50px;
    }

    #googlemap .office_select.btn-success.focus, #googlemap .office_select.btn-success:focus {
        box-shadow: 0 0 0 0.15rem rgba(72,180,97,.5);
    }
</style>
