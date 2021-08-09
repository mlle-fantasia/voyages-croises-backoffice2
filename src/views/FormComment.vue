<template>
  <div>
    <div class="row mb-3">
      <div class="col-md-6" v-if="!commentId">
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
      <div class="col-md-6" v-if="commentId">
        <div class="">
          <label class="form-label" for="email">Votre adresse email *</label>
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
    <div>
      <label for="newCommentaire"
        >{{ commentId ? "Votre réponse" : "Commentaire" }} *</label
      >
      <textarea
        class="form-control mb-3"
        name="newCommentaire"
        id="newCommentaire"
        v-model="newCommentaire.contenu"
        type="textarea"
        rows="4"
      >
      </textarea>
    </div>
    <div class="row mb-3" v-if="!commentId">
      <div class="col-md-6">
        <div class="">
          <label class="form-label" for="email">Votre adresse email *</label>
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
      Votre {{ commentId ? "réponse" : "commentaire" }} à bien été envoyé,
      {{ commentId ? "elle" : "il" }} sera publié{{ commentId ? "e" : "" }} une
      fois vérifié{{ commentId ? "e" : "" }} par l'administrateur du site.
    </div>
    <div class="alert alert-danger" v-if="com_error">
      Attention, un des champs obligatoire est manquant.
    </div>
    <div class="alert alert-danger" v-if="com_backend_error">
      Nous sommes désolés, une erreur s'est produite, veillez réesseyer plus
      tard.
    </div>
    <button @click="addComment" class="btn btn-primary">
      {{ commentId ? "Répondre" : "Commenter" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "FormComment",
  components: {},
  props: {
    articleId: Number,
    commentId: Number,
  },
  data() {
    return {
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
    };
  },
  async mounted() {},
  methods: {
    async responseComment() {},
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
        let response;
        if (!this.commentId) {
          response = await this.$axios.put(
            process.env.VUE_APP_SERVER_URL +
              "/articles/" +
              this.articleId +
              "/newcomment",
            this.newCommentaire
          );
        } else {
          response = await this.$axios.post(
            process.env.VUE_APP_SERVER_URL +
              "/comments/" +
              this.commentId +
              "/newresponse",
            this.newCommentaire
          );
        }
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
          this.$emit("closeform");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
