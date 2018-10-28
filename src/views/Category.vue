<template>
  <div id="category">
    <div class="category__header">
      <h1>{{ category.name }}</h1>
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
var Columns = ['name', 'address', 'contacts' ]

import TableGrid from './../components/TableGrid.vue'

  export default {
    name:'category',
    components:{
      'table-grid': TableGrid
    },
    data () {
      return {
        category:'',
        columns: Columns,
        firms: [],
        color:'#000',
        searchQuery: '',
      }
    },

    mounted () {
      let categoryId = this.$route.params.id
      this.axios
          .get('https://worldinfo.com.ua/api/firms',
              {params: {category_id: categoryId}}).then((response) => {
                  this.category = response.data.category,
                  this.firms = response.data.firms

      })
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
  min-height:100vh;
  padding:3em 6em;
  box-shadow: $shadow1;

}
</style>
