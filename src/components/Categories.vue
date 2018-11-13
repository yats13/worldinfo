<template>
    <div class="flex-container row">
        <router-link v-for= "category in categories" class="flex-1 category_item" :style="{ background: category.color}" :key="category.id" :to="{ name: 'category', params: { id: category.id, name: category.name} }">
          <span>{{ category.count }}</span>
          <p>{{ category.name }}</p>
        </router-link>
    </div>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      categories: "",
      errored: false
    };
  },
  mounted() {
    axios
      .get("https://worldinfo.com.ua/api/categories")
      .then(response => {
        this.categories = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/variables";
.category_item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  color: $main-color;
  border-radius: 2em;
  margin: 0.5em;
  box-shadow: $shadow1;
  background-color: #fff;
  width: calc(15% - 2em);
  transition: all 0.3s ease-in;
  &:hover {
    transform: translateY(-0.2em);
    box-shadow: 0 2px 14px rgba($shadow-color, .25), 0 2px 10px rgba($shadow-color, .22);
  }
  p {
    padding: 0 1rem;
    text-align: center;
  }
  span {
    padding: 0 0.5em;
    font-size: 1.5em;
    color: #fff;
    font-weight: 600;
  }
  .fa-plus {
    font-size: 1.2em;
  }
}
</style>
