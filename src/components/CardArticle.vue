<template>
  <div class="card" @click="goArticle(article)">
    <img
      :src="getImage(article)"
      class="card-img-top"
      alt="image principale de l'article"
    />
    <div class="card-body">
      <p class="text-center text-ocre mb-0">
        {{ article.category ? article.category.text : "" }}
      </p>
      <h4 class="card-title text-center">{{ article.title }}</h4>
      <!-- <p class="card-text">{{ article.resume }}</p> -->
      <div class="d-flex justify-content-between">
        <div>{{ article.user ? article.user.firstname : "" }}</div>
        <div>{{ article.date | formatDate }}</div>
      </div>
      <!--  <a @click="goArticle(article.id)" class="btn btn-primary"
                >Voir plus !
              </a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "navPublic",
  components: {},
  props: {
    article: Object,
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    getImage(article) {
      //return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
      return `${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image`;
    },
    goArticle(article) {
      console.log("article", article);
      this.$router.push("/article/" + article.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
