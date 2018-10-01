<template>
  <div id="category" v-if="category">
    <div class="category__header">
      <h1>{{ category.title }}</h1>
      <router-link :to="{ path: '/'}">Назад</router-link>
    </div>
    <div class="category__body" v-bind:style="{ borderTop: '1em solid' + category.color}">
      <form id="search">
        <font-awesome-icon icon="search" />
        <input name="query" v-model="searchQuery" placeholder="Начните вводить название для быстрого поиска">
       </form>
       <table-grid
         :data="firms"
         :columns="columns"
         :filter-key="searchQuery"
         :color = category.color >
       </table-grid>
    </div>
  </div>
</template>

<script>
var Categories = [
  { id:1, title: 'сельское хозяйство', count: 34, color: '#e94867'},
  { id:2, title: 'лесничества', count: 20, color: '#f1c40f'},
  { id:3, title: 'карьеры и шахты', count: 12, color: '#f87979'},
  { id:4, title: 'заводы', count: 23, color: '#16a085'},
  { id:5, title: 'транспортные предприятия', count: 15, color: '#f39369'},
  { id:6, title: 'строительные компании', count: 40, color: '#2980b9'},
  { id:7, title: 'компании по ремонту дорог', count: 4, color: '#e67e22'}
]
var Columns = ['name','address','contacts']
var Firms = [{name:'Roschen', address:'Киев',contacts:'01'}]

import TableGrid from './../components/TableGrid.vue'

  export default {
    name:'category',
    components:{
      'table-grid': TableGrid
    },
    data () {
      return {
        title: 'Я на странице категории',
        categories: Categories,
        category: null,
        columns: Columns,
        firms: Firms,
        searchQuery: '',
      }
    },
    created () {
      var categoryId = this.$route.params.id
      this.category = this.categories[categoryId]
    }
  }
</script>
<style lang="scss" scoped>
@import "../assets/scss/variables";
#category{
  margin: 0 auto;
  padding: 0 10em;
  overflow-x: hidden;
  min-height: calc(100vh - 5em);
}
#search{
  margin-bottom: 3em;
  position: relative;
  .fa-search{
    position:absolute;
    top:16px;
    left:10px;
  }
  input{
    padding:1em 2em;
  }
}
.category__header{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.category__body{
  background-color: $white;
  width:100%;
  height:100vh;
  padding:3em 6em;
  box-shadow: $shadow1;

}
</style>
