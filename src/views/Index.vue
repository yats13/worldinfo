<template>
  <div id="index">
      <section class="second_screen">
          <h2>{{ header_region }}</h2>
          <categories></categories>
      </section>
<section class="first_screen">
    <div class="flex-container row">
      
        <Map/>
      <div id="chart" class="flex-1">
        <h3>{{statistic.title}}</h3>
          <div class="chart__view">
            <chart/>
          </div>
        <hr>
        <div class="help">
          <p>{{ help_text }}</p>
        </div>
      </div>
    </div>
</section>
  </div>
</template>
<script>
import Categories from "./../components/Categories.vue";
import Map from "./../components/Map.vue";
import Chart from "./../components/Chart.vue";

export default {
  name: "index",

  components: {
    Categories,
    Chart,
    Map
  },
  data() {
    return {
      title: "Я на странице индекса",
      map_title: "",
      header_map: "Выберите регион",
      header_region: "Выберите отрасль",
      statistic: {
        title: "Общая информация",
        body: ""
      },
      help_text: "",
      errored: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/variables";
#index {
  margin: 0 auto;
  padding: 0 10em;
  overflow-x: hidden;
}
#chart {
  width: calc(50% - 2em);
  margin: 1em;
  background-color: $white;
  box-shadow: $shadow1;
}
#map {
  width: calc(50% - 2em);
  margin: 1em;
  background-color: $white;
  box-shadow: $shadow1;
}
</style>
