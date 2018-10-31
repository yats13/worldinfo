<template>
    <div>
    <l-map
            :center="[47,32]"
            :zoom="5"
            style="height: 450px;"
            :options="mapOptions">
        <l-choropleth-layer
                :data="Data"
                titleKey="name"
                idKey="map_id"
                :value="value"
                :extraValues="extraValues"
                :geojson="ukraine"
                geojsonIdKey="map_id"
                currentStrokeWidth=1
                :colorScale="colorScale">
            <template slot-scope="props">
                <l-info-control
                        :item="props.currentItem"
                        :unit="props.unit"
                        title="Предприятия"
                        placeholder="Выберите область"/>
                <l-reference-chart
                        title="Girls school enrolment"
                        :colorScale="colorScale"
                        :min="props.min"
                        :max="props.max"
                        position="bottomright"/>
            </template>
        </l-choropleth-layer>
    </l-map>
    </div>
</template>
<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
import { LMap } from 'vue2-leaflet';
import ukraine from '../assets/map/Ukraine.json'
export default {
    name:'Map',
    components: {
        LMap,
        'l-info-control': InfoControl,
        'l-reference-chart': ReferenceChart,
        'l-choropleth-layer': ChoroplethLayer
    },
    data() {
        return {
            Data:[],
            geojson:'',
            ukraine,
            colorScale: [],
            value: {
                key: "id",
                metric: "% girls"
            },
            extraValues: [{
                key: "map_id",
                metric: "% boys"
            }],
            mapOptions: {
                attributionControl: false
            },
            currentStrokeColor: '3d3213',
            errored:''
        }
    },
    methods:{
        renderMapData (){
            this.axios
            .get('https://worldinfo.com.ua/api/regions')
            .then((response) => {
                this.Data = response.data.data;
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            });
        },
        renderColors (){
            this.axios
            .get('https://worldinfo.com.ua/api/categories')
            .then((response) => {
                response.data.forEach((item) => {
                    this.colorScale.push(item.color);
                });
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            });
        },
        renderGeoJson(){
            let geojson = this.ukraine;
            this.geojson = geojson
        }
    },
    mounted (){
        this.renderMapData()
        this.renderColors()
        this.renderGeoJson()
    }
}
</script>
<style lang="scss">
    @import "~leaflet/dist/leaflet.css";
    .leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar{
        border:none;
    }
    .leaflet-touch .leaflet-bar a{
        line-height: 28px;
    }
    .leaflet-touch .leaflet-bar a:last-child{
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
    }
    .leaflet-touch .leaflet-bar a:first-child{
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
    }
</style>