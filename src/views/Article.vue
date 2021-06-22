<template>
  <div class="">
    <div class="container-fluid bg-image img-article" :style="getImage()"></div>
    <div class="container mt-5">
      <h1 class="text-center">{{ article.title }}</h1>
      <hr />
      <div class="row mt-4">
        <div class="col-md-12" v-html="article.contenu"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "article",
  components: {},
  data() {
    return {
      article: {},
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/articles/" + this.$route.params.id
    );
    console.log(response);
    this.article = response.data.article;
  },
  methods: {
    getImage() {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${this.article.id}/image')`;
    },
  },
};
</script>
<style lang="scss" scoped>
.img-article {
  height: 70vh;
}
.logo {
  margin-top: 57px;
  margin-bottom: 60px;
  width: 100px;
}

@media (min-width: 992px) {
  .logo {
    margin-bottom: 80px;
    width: 150px;
  }
}
</style>
