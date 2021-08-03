<template>
  <div>
    <div class="">
      <h5 class="text-center mb-0">A propos</h5>
      <hr />
      <router-link class="nav-link" to="/apropos">
        <img class="img-fluid" src="/img/propos.jpg" alt="" />
      </router-link>
      <div v-html="textapropos"></div>
      <h5 class="mt-4 text-center mb-0">Derniers articles</h5>
      <hr />
    </div>
    <div class="" v-for="article in lastArticles" :key="article.id">
      <div class="card" @click="goArticle(article)">
        <img
          :src="getImage(article)"
          class="card-img-top py-2 px-3"
          alt="image principale de l'article"
        />
        <div class="card-body pt-1">
          <!-- <p class="text-center text-ocre mb-0">
            {{ article.category ? article.category.text : "" }}
          </p> -->
          <h6 class="card-title text-center">{{ article.title }}</h6>
          <div class="d-flex justify-content-end">
            <div class="me-1">
              {{ article.user ? article.user.firstname : "" }} le
            </div>
            <div>{{ article.date | formatDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aside",
  components: {},
  props: {
    textapropos: String,
    lastArticles: Array,
  },
  watch: {},
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
      this.$router.push("/article/" + article.id);
    },
  },
};
</script>
