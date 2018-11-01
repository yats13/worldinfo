<template>
  <div id="index">
      <section class="second_screen">
          <h2>{{ header_2 }}</h2>
          <categories></categories>
      </section>
<section class="first_screen">
    <h2>{{ header_1 }}</h2>
    <div class="flex-container row">
      <div id="map" class="map">
        <h3>{{ map_title}}</h3>
      <Map />
      </div>  
      <div id="chart" class="flex-1">
        <h3>{{statistic.title}}</h3>
          <div class="chart__view">
            <charts :labels="chartLabels"></charts>
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
            map_title:'',
            header_1: 'Выберите регион',
            header_2: 'Выберите отрасль',
            statistic:{
                title:'Общая информация',
                body:''
            },
          help_text:'',
          chartLabels:[],
          errored:false,
      }
    },
    mounted(){
      axios
        .get('https://worldinfo.com.ua/api/categories')
        .then((response) => {
            response.data.forEach((item) => {
                this.chartLabels.push(item.name)
            });
        })
        .catch(error => {
            console.log(error);
            this.errored = true;
        });
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
#map{
  width:calc(50% - 2em);
}  
</style>
