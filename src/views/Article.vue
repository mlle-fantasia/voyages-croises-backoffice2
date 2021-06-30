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
                <img
                  class="img-fluid"
                  :src="`/img/imgcomments/comment${com.image}.jpg`"
                  alt=""
                />
              </div>
              <div class="col-md-10">
                <p>
                  <span class="fw-bold">{{ com.name }}</span> le
                  {{ com.createdAt | formatDateTime }}
                </p>
                <h6>{{ com.title }}</h6>
                <p>{{ com.contenu }}</p>
              </div>
            </div>
          </div>
          <div v-else>Il n'y a pas encore de commentaire sur cet article</div>
          <hr />
          <h5 class="text-center">
            Si vous avez aimé cette article, vous pouvez nous laisser un
            commentaire
          </h5>
          <div class="mb-3">
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
          <div>
            <label for="newCommentaire">Commentaire *</label>
            <textarea
              class="form-control mb-3"
              name="newCommentaire"
              id="newCommentaire"
              v-model="newCommentaire.text"
              type="textarea"
              rows="6"
            >
            </textarea>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
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
            <div class="col-md-6">
              <div class="mb-3">
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
          </div>
          <div class="alert alert-success" v-if="com_success">
            Votre commentaire à bien été envoyé, il sera publié une fois vérifié
            par l'administrateur du site
          </div>
          <div class="alert alert-danger" v-if="com_error">
            Attention, un des champs obligatoire est manquant
          </div>
          <button @click="addComment" class="btn btn-primary">Commenter</button>
        </div>
        <div class="col-md-3">
          <h5 class="text-center mb-0">A propos</h5>
          <hr />
          <router-link
            class="nav-link"
            :class="$route.name === 'About' ? 'active' : ''"
            to="/apropos"
          >
            <img class="img-fluid" src="/img/propos.jpg" alt="" />
          </router-link>
          <p class="text-center">
            Lionel et Alexandre, père et fils, sont passionnés de voyages et de
            découvertes, ils partagent avec vous leur expérience
          </p>
          <h5 class="mt-4 text-center mb-0">Derniers articles</h5>
          <hr />
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
      newCommentaire: { text: "", email: "", name: "", title: "" },
      com_success: false,
      com_error: false,
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
    async addComment() {
      this.com_error = false;
      this.com_success = false;
      if (
        !this.newCommentaire.text ||
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
