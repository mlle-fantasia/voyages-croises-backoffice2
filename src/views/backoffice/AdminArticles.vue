<template>
  <div class="admin-articles">
    <div class="d-flex align-items-center">
      <h2>Les articles</h2>
      <button @click="addArticle" class="btn btn-warning ms-5">Nouveau</button>
    </div>
    <div class="row articles-list mt-3">
      <div
        @click="editArticles(article.id)"
        class="col-md-6"
        v-for="article in articles"
        :key="article.id"
      >
        <div class="card-article d-flex align-items-center">
          <div class="bg-image miniature" :style="getImage(article)"></div>
          <div class="ms-2 fw-bold">
            {{ article.title }}
          </div>
          <div class="flex-grow-1"></div>
          <div v-if="article.visible" class="text-success">Visible</div>
          <div v-else class="text-danger">Invisible</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AdminArticles",
  components: {},
  data() {
    return {
      articles: [],
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/admin/articles/list"
    );
    console.log(response);
    this.articles = response.data;
  },
  methods: {
    getImage(article) {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
    },
    editArticles(articleId) {
      this.$router.push("/admin/articles/" + articleId);
    },
    addArticle() {
      this.$router.push("/admin/articles/-1");
    },
  },
};
</script>
<style lang="scss" scoped>
.card-article {
  cursor: pointer;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #eae8e8;
  box-shadow: lightgrey 0px 1px 2px 0px;
  margin-bottom: 15px;
  padding: 5px 12px;
}
</style>
