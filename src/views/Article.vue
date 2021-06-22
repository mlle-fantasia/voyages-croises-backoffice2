<template>
  <div class="home">
    <div class="container-fluid bg-image img-article" :style="getImage()"></div>
    <div class="container">
      <h1 class="text-center">{{ article.title }}</h1>
      <hr />
      <div class="row">
        <div class="col-md-12">
          {{ article.contenu }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
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
    this.article = response.data;
  },
  methods: {
    getImage(article) {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
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
