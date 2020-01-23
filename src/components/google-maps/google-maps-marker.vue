<script>
    import { POINT_MARKER_ICON_CONFIG } from "./constants/mapSettings";

    import methods from "./mixins/methods";

    export default {
        mixins: [methods],
        props: {
            google: {
                type: Object,
                required: true
            },
            oms: {
                type: Object,
                required: true
            },
            map: {
                type: Object,
                required: true
            },
            marker: {
                type: Object,
                required: true
            },
            state: {
                type: Object,
                default: () => new Object
            }
        },
        computed: {
            position(){
                return({
                    lat: this.marker.rentalLocation.locationGeocodeInfo.position.porPosition.porLatitude,
                    lng: this.marker.rentalLocation.locationGeocodeInfo.position.porPosition.porLongitude
                });
            }
        },
        mounted() {
            const { Marker, InfoWindow } = this.google.maps;

            const info_window = new InfoWindow();

            let marker_object = new Marker({
                position: this.position,
                map: this.map,
                icon: POINT_MARKER_ICON_CONFIG
            });
            
            marker_object.addListener('mouseover', () => {
                if(!this.state.open_info_window){
                    info_window.setContent(`${this.marker.rentalLocation.address.locationDetails.name} - ${this.marker.carCompanyData.companyName} - ${this.marker.rentalLocation.address.addressDetails.line1}`);

                    info_window.open(this.map, marker_object);
                }
            });

            marker_object.addListener('mouseout', () => {
                info_window.close();
            });

            marker_object.options = {
                content: this.generateFrontInfoWindow(this)
            }

            this.oms.addMarker(marker_object);
        },
        render(){
        }
    };
</script>