<template>
  <div id="categories">
    <div class="flex-container row">
      <div v-for= "category in categories" class="flex-1 category_item" v-bind:style="{ borderBottom: '1rem solid'+ category.color}">
        <h3>{{ category.name }}</h3>
        <span v-bind:style="{ color: category.color}">{{ category.count }}</span>
        <hr>
        <div><router-link :to="{ name: 'category', params: { id: category.id, name: category.name} }">Нажмите,</router-link> чтобы посмотреть все предприятия данной области</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "categories",
  data(){
    return{
        categories:''
    }
  },
  mounted(){
      this.axios
          .get('https://worldinfo.com.ua/api/categories')
          .then((response) => {
              this.categories = response.data
          })
          .catch(error => {
              console.log(error);
              this.errored = true;
          });
  }
}
</script>
<style lang="scss" scoped>
.category_item{
  padding: 2em;
}

</style>
