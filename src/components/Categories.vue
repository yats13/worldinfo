<template>
    <div class="flex-container row">
        <router-link v-for= "category in categories" class="flex-1 category_item" :to="{ name: 'category', params: { id: category.id, name: category.name} }">
          <span :style="{ background: category.color}">{{ category.count }}</span>
          <p>{{ category.name }}</p>
        </router-link>
    </div>
</template>

<script>
export default {
  name: "categories",
  data(){
    return{
        categories:'',
        errored:false
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
@import '../assets/scss/variables';
.category_item{
  display:flex;
  flex-direction: row;
  overflow: hidden;
  align-items:center;
  color:$main-color;

  margin: .5em;
  box-shadow: $shadow1;
  background-color: #fff;
  width: calc(15% - 2em);
  transition: all .3s ease-in;
  &:hover{
    transform: translateY(-.2em);
    box-shadow: $shadow2;
  }
  p {
    padding: 0 .5em;
  }
  span {
    padding:1em 1.5em;
    color: #fff;
    font-weight: 600;
  }
  .fa-plus {
    font-size: 1.2em;
  }
}
</style>
