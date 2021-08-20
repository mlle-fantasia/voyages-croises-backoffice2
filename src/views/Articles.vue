<template>
  <div class="home">
    <div class="container mt-5">
      <h2 class="text-center">{{ category }}</h2>
      <hr />
      <div class="row my-5">
        <div
          class="col-md-4 mb-4"
          v-for="article in articles"
          :key="article.id"
        >
          <card-article :article="article"></card-article>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <h2 class="text-center">Retrouvez Lionel sur Instagram</h2>
      <hr />
    </div>
    <div class="container-fluid"></div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  components: {},
  data() {
    return {
      articles: [],
      category: "",
    };
  },
  async mounted() {
    console.log("je passse");
    let query = {
      category: this.$route.params.key,
    };
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/articles/list",
      { params: query }
    );
    console.log(response);
    this.articles = response.data;
    this.category = this.articles[0].category.text;
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@media (min-width: 992px) {
}
</style>
