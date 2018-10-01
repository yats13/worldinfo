<template>
  <div id="index">
<section class="first_screen">
    <h2>{{ header_1 }}</h2>
    <div class="flex-container row">
      <Map />
      <div id="chart" class="flex-1">
        <h3>{{statistic.title}}</h3>
          <div class="chart__view">
            <Charts />
          </div>
        <hr>
        <div class="help">
          <p>{{ help_text }}</p>
        </div>
      </div>
    </div>
</section>
<section class="second_screen">
    <h2>{{ header_2 }}</h2>
    <categories></categories>

</section>
  </div>
</template>
<script>

import Categories from  './../components/Categories.vue'
import Map from  './../components/Map.vue'
import Charts from  './../components/Chart.vue'

  export default {
    name:'index',
    components: {
      Categories,
      Charts,
      Map
    },
    data () {
      return {
        title: 'Я на странице индекса',
        header_1: 'Выберите регион',
        header_2: 'Выберите отрасль',
        statistic:{
          title:'Общая информация',
          body:''
        },
        help_text:''
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../assets/scss/variables";
#index{
  margin: 0 auto;
  padding: 0 10em;
  overflow-x: hidden;
}
#chart{
  width:calc(50% - 2em);
  margin:1em;
  background-color: $white;
  box-shadow: $shadow1;
}
</style>
