<template>
  <div id="categories">
    <div class="flex-container row">
      <div v-for= "(category, index) in categories" class="flex-1 category_item" v-bind:style="{ borderBottom: '1rem solid'+ category.color}">
        <h3>{{ category.title }}</h3>
        <span v-bind:style="{ color: category.color}">{{ category.count }}</span>
        <hr>
        <div><router-link :to="{ name: 'category', params: { id: index} }">Нажмите,</router-link> чтобы посмотреть все предприятия данной области</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "categories",
  data () {
    return {
      categories: [
        {
          id:1,
          title: 'сельское хозяйство',
          count: 34,
          color: '#e94867'
        },
        {
          id:2,
          title: 'лесничества',
          count: 20,
          color: '#f1c40f'
        },
        {
          id:3,
          title: 'карьеры и шахты',
          count: 12,
          color: '#f87979'
        },
        {
          id:4,
          title: 'заводы',
          count: 23,
          color: '#16a085'
        },
        {
          id:5,
          title: 'транспортные предприятия',
          count: 15,
          color: '#f39369'
        },
        {
          id:6,
          title: 'строительные компании',
          count: 40,
          color: '#2980b9'
        },
        {
          id:7,
          title: 'компании по ремонту дорог',
          count: 4,
          color: '#e67e22'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.category_item{
  padding: 2em;
}

</style>
