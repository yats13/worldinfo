<template>
        <l-map 
        :center="[47,32]" 
        :zoom="5" 
        style="height: 450px;" 
        :options="mapOptions">
            <l-choropleth-layer 
            :data="Data" 
            titleKey="department_name" 
            idKey="id" 
            :value="value" 
            :extraValues="extraValues" 
            geojsonIdKey="dpto" 
            :geojson="geojson" 
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
            Data:null,
            geojson: ukraine,
            colorScale: ["e7d090", "e9ae7b", "de7062"],
            value: {
                key: "amount_w",
                metric: "% girls"
            },
            extraValues: [{
                key: "amount_m",
                metric: "% boys"
            }],
            mapOptions: {
                attributionControl: true
            },
            currentStrokeColor: '3d3213'
        }
    },
    methods:{
        renderMapData (){
        this.axios
        .get('https://worldinfo.com.ua/api/categories')
        .then((response) => {
            response.data.forEach((item) => {
            console.log(item)
            this.Data.push(item)
            });
        })
        .catch(error => {
            console.log(error);
            this.errored = true;
        });
        }
    },
    mounted (){
        this.renderMapData()
    }
}
</script>
<style>
    @import "~leaflet/dist/leaflet.css";
</style>