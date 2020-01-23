<template>
    <div>
        <div
            ref="googleMap"
            class="google-map"
        />
        
        <template v-if="Boolean(google) && Boolean(map) && Boolean(oms)">
            <slot
                :google="google"
                :map="map"
                :oms="oms"
                :state="state"
            />
        </template>
    </div>
</template>

<script>
    import GoogleMapsApiLoader from 'google-maps-api-loader';

    export default {
        props: {
            mapConfig: {
                default: () => new Object(),
                type: Object
            },
            apiConfig: {
                default: () => new Object(),
                type: Object
            }
        },
        data() {
            return ({
                google: null,
                map: null,
                oms: null,
                state: {
                    open_info_window: false
                }
            });
        },
        async mounted() {
            const googleMapApi = await GoogleMapsApiLoader({
                ...this.apiConfig
            });

            this.google = googleMapApi;

            this.initializeMap();
        },
        methods: {
            initializeMap() {
                const OverlappingMarkerSpiderfier = require('overlapping-marker-spiderfier');

                const { InfoWindow, Map } = this.google.maps;

                this.map = new Map(this.$refs.googleMap, this.mapConfig);

                this.oms = new OverlappingMarkerSpiderfier(this.map, {
                    legWeight: 2.5,
                    circleFootSeparation: 38,
                    legColors: {
                        usual: {
                            roadmap: '#007bff',
                        },
                        highlighted: {
                            roadmap: '#007bff',
                        }
                    }
                });

                const info_window = new InfoWindow();

                this.map.addListener('click', () => {
                    info_window.close();

                    this.state.open_info_window = false;
                });

                this.oms.addListener('click', marker => {
                    info_window.setContent(marker.options.content);

                    info_window.open(this.map, marker);

                    this.state.open_info_window = true;
                });

                this.oms.addListener('spiderfy', () => {
                    info_window.close();

                    this.state.open_info_window = false;
                });

                this.oms.addListener('unspiderfy', () => {
                    info_window.close();

                    this.state.open_info_window = false;
                });
            }
        }
    }
</script>

<style scoped>
    .google-map {
        width: 100%;
        min-height: 100%;
    }
</style>