<template>
  <div>
    <h2>Les commentaires</h2>
    <h5>{{ commentsNotVisible.length }} commentaires non publiés</h5>
    <div class="row">
      <div
        class="col-md-12 col-lg-6"
        v-for="com in commentsNotVisible"
        :key="com.id"
      >
        <div class="card-comment">
          <div><span class="fw-bold">Nom :</span> {{ com.name }}</div>
          <div><span class="fw-bold">Email :</span> {{ com.email }}</div>
          <div><span class="fw-bold">Titre :</span> {{ com.title }}</div>
          <div>
            <span class="fw-bold">Commentaire :</span> {{ com.contenu }}
          </div>
          <div><span class="fw-bold">Site web : </span> {{ com.sitweb }}</div>
          <div>
            <span class="fw-bold">Date :</span> {{ com.createdAt | formatDate }}
          </div>
          <div>
            <span class="fw-bold">Article :</span> {{ com.articles.title }}
          </div>
          <div class="mt-2">
            <button @click="hideOrShow(com)" class="btn btn-success btn-sm">
              Publier
            </button>
            <button @click="deleteCom(com)" class="btn btn-danger btn-sm ms-2">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    <h5 class="mt-4">Tous les commentaires par article</h5>
    <div class="row">
      <div
        class="col-md-12 col-lg-6 mt-2"
        v-for="article in articlesComment"
        :key="article.id"
      >
        <div class="d-md-flex">
          <div
            class="bg-image miniature d-none d-md-block"
            :style="getImage(article)"
          ></div>
          <div>
            <div class="ms-2 fw-bold">
              {{ article.title }}
            </div>
            <button
              @click="showComments(article.id)"
              class="btn btn-warning btn-sm ms-2"
            >
              Les commentaires
            </button>
          </div>
          <div class="ms-2">{{ article.comments.length }} commentaire(s)</div>
        </div>
        <div v-if="hideOrShowAllComment(article.id)">
          <div
            class="comArticle ms-md-3"
            v-for="com in article.comments"
            :key="com.id"
          >
            <div>{{ com.name }} le {{ com.createdAt | formatDate }}</div>
            <div>
              <span class="fw-bold">{{ com.title }}</span>
            </div>
            <div>{{ com.contenu }}</div>
            <div>
              <span class="fw-bold">Email :</span> {{ com.email }}
              <span class="ms-2" v-if="com.sitweb"
                >Site web : {{ com.sitweb }}</span
              >
            </div>
            <div class="d-flex mt-2 align-items-center">
              <div :class="com.visible ? 'text-success' : 'text-danger'">
                {{ com.visible ? "Visible" : "Invisible" }}
              </div>
              <button
                @click="hideOrShow(com)"
                class="btn btn-sm ms-2"
                :class="com.visible ? 'btn-warning' : 'btn-success'"
              >
                {{ com.visible ? "Masquer" : "Publier" }}
              </button>
              <button
                @click="deleteCom(com)"
                class="btn btn-danger btn-sm ms-2"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminComments",
  components: {},
  data() {
    return {
      commentsNotVisible: [],
      articlesComment: [],
      showAllComment: 0,
    };
  },
  async mounted() {
    this.loadComment();
  },
  methods: {
    getImage(article) {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
    },
    async loadComment() {
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL + "/admin/comments"
      );
      console.log(response);
      this.commentsNotVisible = response.data.notVisible;
      this.articlesComment = response.data.allComments;
    },
    hideOrShowAllComment(articleId) {
      return this.showAllComment === articleId;
    },
    showComments(articleId) {
      if (this.showAllComment === articleId) this.showAllComment = 0;
      else this.showAllComment = articleId;
    },
    async hideOrShow(comment) {
      await this.$axios.put(
        process.env.VUE_APP_SERVER_URL + "/admin/comments/" + comment.id,
        { visible: !comment.visible }
      );
      this.loadComment();
    },
    async deleteCom(comment) {
      await this.$axios.delete(
        process.env.VUE_APP_SERVER_URL + "/admin/comments/" + comment.id
      );
      this.loadComment();
    },
  },
};
</script>
<style lang="scss" scoped>
.card-comment {
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #eae8e8;
  box-shadow: lightgrey 0px 1px 2px 0px;
  margin-bottom: 15px;
  padding: 5px 12px;
}
.comArticle {
  margin-top: 10px;
  border: 1px solid #eae8e8;
  box-shadow: lightgrey 0px 1px 2px 0px;
  margin-bottom: 15px;
  padding: 5px 12px;
}
</style>
