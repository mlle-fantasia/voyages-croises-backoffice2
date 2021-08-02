<template>
  <div class="">
    <div class="container-fluid bg-image img-article" :style="getImage()"></div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-9 mb-5">
          <h1 class="text-center">{{ article.title }}</h1>
          <hr />
          <p class="text-center">
            Publié le
            {{ article.date | formatDate }} par
            {{ article.user ? article.user.firstname : "" }}
          </p>
          <div class="row mt-4">
            <div class="col-md-12" v-html="article.contenu"></div>
          </div>
          <h1 class="text-center">Commentaires</h1>
          <hr />
          <div v-if="article.comments.length">
            <div class="row" v-for="com in article.comments" :key="com.id">
              <div class="col-md-2">
                <img class="img-fluid" :src="getImageComment(com)" alt="" />
              </div>
              <div class="col-md-10">
                <p>
                  <span class="fw-bold">{{ com.name }}</span> le
                  {{ com.createdAt | formatDateTime }}
                </p>
                <h6>{{ com.title }}</h6>
                <p>{{ com.contenu }}</p>
                <div>{{ com.siteweb }}</div>
              </div>
            </div>
          </div>
          <div v-else>Il n'y a pas encore de commentaire sur cet article</div>
          <hr />
          <h5 class="text-center">
            Si vous avez aimé cette article, vous pouvez nous laisser un
            commentaire
          </h5>
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="">
                <label class="form-label" for="title">Titre</label>
                <br />
                <input
                  class="form-control"
                  name="title"
                  id="title"
                  v-model="newCommentaire.title"
                  type="text"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="">
                <label class="form-label" for="name">Votre nom *</label>
                <br />
                <input
                  class="form-control"
                  name="name"
                  id="name"
                  v-model="newCommentaire.name"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div>
            <label for="newCommentaire">Commentaire *</label>
            <textarea
              class="form-control mb-3"
              name="newCommentaire"
              id="newCommentaire"
              v-model="newCommentaire.contenu"
              type="textarea"
              rows="6"
            >
            </textarea>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="">
                <label class="form-label" for="email"
                  >Votre adresse email *</label
                >
                <br />
                <input
                  class="form-control"
                  name="email"
                  id="email"
                  v-model="newCommentaire.email"
                  type="text"
                />
                <small>Votre adresse email ne sera pas publiée</small>
              </div>
            </div>
            <div class="col-md-6">
              <div class="">
                <label class="form-label" for="name">Site web</label>
                <br />
                <input
                  class="form-control"
                  name="name"
                  id="name"
                  v-model="newCommentaire.siteweb"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="alert alert-success" v-if="com_success">
            Votre commentaire à bien été envoyé, il sera publié une fois vérifié
            par l'administrateur du site.
          </div>
          <div class="alert alert-danger" v-if="com_error">
            Attention, un des champs obligatoire est manquant.
          </div>
          <div class="alert alert-danger" v-if="com_backend_error">
            Nous sommes désolés, une erreur s'est produite, veillez réesseyer
            plus tard.
          </div>
          <button @click="addComment" class="btn btn-primary">Commenter</button>
        </div>
        <div class="col-md-3">
          <aside2
            :lastArticles="lastArticles"
            :textapropos="textapropos"
          ></aside2>
        </div>
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
      newCommentaire: {
        contenu: "",
        email: "",
        name: "",
        title: "",
        siteweb: "",
      },
      com_success: false,
      com_error: false,
      com_backend_error: false,
      textapropos: "",
      lastArticles: [],
    };
  },
  async mounted() {
    let params = {
      aside: true,
    };
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/articles/" + this.$route.params.id,
      { params }
    );
    console.log(response);
    this.article = response.data.article;

    this.textapropos = response.data.apropos.text;
    this.lastArticles = response.data.lastarticles;
  },
  methods: {
    getImageComment(comment) {
      //return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
      return `${process.env.VUE_APP_SERVER_URL}/comment/${comment.id}/image`;
    },
    getImage() {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${this.article.id}/image')`;
    },
    async addComment() {
      this.com_error = false;
      this.com_success = false;
      this.com_backend_error = false;
      if (
        !this.newCommentaire.contenu ||
        !this.newCommentaire.name ||
        !this.newCommentaire.email
      )
        this.com_error = true;
      else {
        let response = await this.$axios.put(
          process.env.VUE_APP_SERVER_URL +
            "/articles/" +
            this.$route.params.id +
            "/newcomment",
          this.newCommentaire
        );
        console.log(response);
        if (response.status !== 200) {
          this.com_backend_error = true;
        } else {
          this.com_success = true;
          // reset comment
          this.newCommentaire = {
            contenu: "",
            email: "",
            name: "",
            title: "",
            siteweb: "",
          };
        }
      }
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
