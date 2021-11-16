<template>
  <div class="home" ref="home">
    <div class="container-fluid img-accueil">
      <img src="/img/logo.png" class="logo" alt="logo" />
      <button @click="decouvrir" class="btn btn-warning">Découvrir</button>
    </div>
    <div class="container-fluid bg-ocre">
      <div class="container" v-html="textBienvenue"></div>
    </div>
    <div class="container mt-5" ref="decouvrir">
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
    <div class="container-fluid p-0">
      <div @click="goInsta" class="d-flex overflow-scroll">
        <div class="" v-for="file in imgInsta" :key="file.id">
          <div class="pointer img-insta" :style="getImageInst(file.id)" />
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
      lastArticles: [],
      texts: [],
      imgInsta: [],
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

    // get image instagram
    let response3 = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/files/instagram"
    );
    this.imgInsta = response3.data;
  },
  methods: {
    decouvrir() {
      this.$refs.decouvrir.scrollIntoView();
    },
    getImage(article) {
      //return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
      return `${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image`;
    },
    getImageInst(id) {
      if (id < 1) return;
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/files/${id}/instagram')`;
    },
    goInsta() {
      window.open("https://www.instagram.com/lio.front/?hl=fr", "bank");
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
.img-insta {
  width: 280px;
  height: 280px;
  background-position: center;
  background-size: cover;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
.img-insta:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.3);
}
</style>
