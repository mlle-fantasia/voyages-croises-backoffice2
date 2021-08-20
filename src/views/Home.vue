<template>
  <div class="home">
    <div class="container-fluid img-accueil">
      <img src="/img/logo.png" class="logo" alt="logo" />
      <button class="btn btn-warning">Découvrir</button>
    </div>
    <div class="container-fluid bg-ocre">
      <div class="container" v-html="textBienvenue"></div>
    </div>
    <div class="container mt-5">
      <h2 class="text-center">Les derniers articles</h2>
      <hr />
      <div class="row my-5">
        <div
          class="col-md-4 mb-4"
          v-for="article in lastArticles"
          :key="article.id"
        >
          <card-article :article="article"></card-article>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-image bg-lio">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 bg-white" v-html="presentationBlog"></div>
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
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      lastArticles: [],
      texts: [],
      presentationBlog: "",
      textBienvenue: "",
    };
  },
  async mounted() {
    // get les trois derniers articles
    let query = {
      page: "home",
    };
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/articles/list",
      { params: query }
    );
    console.log(response);
    this.lastArticles = response.data;

    // get text de la page
    let response2 = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/pages/" + this.$route.name
    );
    this.texts = response2.data.page.texts;
    let textBienvenue = this.texts.filter((text) => {
      return text.key === "Texte de bienvenue";
    });
    if (textBienvenue.length) this.textBienvenue = textBienvenue[0].text;

    let presentationBlog = this.texts.filter((text) => {
      return text.key === "Description du blog";
    });
    if (presentationBlog.length)
      this.presentationBlog = presentationBlog[0].text;
  },
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
<style lang="scss" scoped>
.img-accueil {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-image: url("/img/loginfond.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
.bg-lio {
  padding: 60px;
}
</style>
