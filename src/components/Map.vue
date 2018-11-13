<template>
<div id="map" class="map">
<h3>{{title}}</h3>
<div id="lmap"></div>
</div>
    
</template>
<script>
import L from "leaflet";
import ukraine from "../assets/map/Ukraine.json";
export default {
  name: "Map",
  data() {
    return {
      title: "Выберите регион",
      mapData: [],
      ukraine,
      geojson: null,
      currentItem: null,
      countFirms: [],
      currentStrokeColor: "3d3213",
      errored: ""
    };
  },
  methods: {
    highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
        weight: 2,
        color: "#fff",
        dashArray: "",
        fillOpacity: 0.7
      });
      this.currentItem = layer.feature.properties.map_id;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    renderColors(regionId) {
      axios
        .get("https://worldinfo.com.ua/api/map", {
          params: { region_id: regionId }
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },
    getColor(d) {
      return d > 1000
        ? "#800026"
        : d > 500
          ? "#BD0026"
          : d > 200
            ? "#E31A1C"
            : d > 100
              ? "#FC4E2A"
              : d > 50
                ? "#FD8D3C"
                : d > 20
                  ? "#FEB24C"
                  : d > 10
                    ? "#FED976"
                    : "#FFEDA0";
    },
    style(feature) {
      const mapId = feature.properties.map_id;
      const color = this.renderColors(mapId);
      return {
        fillColor: this.getColor(color),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7
      };
    },
    resetHighlight(e) {
      this.geojson.resetStyle(e.target);
      this.title = "Выберите регион";
    },
    onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight
      });
    },
    renderMap() {
      const map = L.map("lmap", {
        center: [48, 31],
        zoom: 5
      });
      this.geojson = L.geoJSON(this.ukraine, {
        style: this.style,
        onEachFeature: this.onEachFeature
      }).addTo(map);
      return this.geojson;
    }
  },
  watch: {
    currentItem: function(val) {
      axios
        .get("https://worldinfo.com.ua/api/region", {
          params: { map_id: val }
        })
        .then(response => {
          this.mapData = response.data;
          this.title = response.data[0].name;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    }
  },
  mounted() {
    setTimeout(() => {
      this.renderMap();
    }, 400);
  }
};
</script>
<style lang="scss">
@import "~leaflet/dist/leaflet.css";
@import "../assets/scss/variables";
#lmap {
  height: 320px;
  padding: 1em;
}
.leaflet-container {
  background-color: $white;
}
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: none;
}
.leaflet-touch .leaflet-bar a {
  line-height: 2em;
  font-size: 1.5rem;
  border-color: $inactive;
}
.leaflet-touch .leaflet-bar a:last-child {
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  box-shadow: $shadow1;
}
.leaflet-touch .leaflet-bar a:first-child {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  box-shadow: $shadow1;
}
</style>