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
              <div class="col-2 text-center">
                <img
                  class="img-fluid img-comment"
                  :src="getImageComment(com)"
                  alt=""
                />
              </div>
              <div class="col-10 comment">
                <p class="mb-1">
                  <span class="fw-bold">{{ com.name }}</span> le
                  <span class="fs-6">{{ com.createdAt | formatDateTime }}</span>
                  <span
                    @click="showRresponseComment(com)"
                    class="cursor-pointer fw-bold ms-2"
                    >Répondre</span
                  >
                </p>
                <h6 class="mb-0">{{ com.title }}</h6>
                <p class="mb-0">{{ com.contenu }}</p>
                <a class="mb-1" :href="com.siteweb" target="banck">{{
                  com.siteweb
                }}</a>
                <div
                  class="form-response p-3 bg-light"
                  v-if="showFormResponse && commentToResponse.id === com.id"
                >
                  <form-comment
                    :articleId="article.id"
                    :commentId="commentToResponse.id"
                    @closeform="closeformResponse"
                  ></form-comment>
                </div>
              </div>
            </div>
          </div>
          <div v-else>Il n'y a pas encore de commentaire sur cet article</div>
          <hr />
          <h5 class="text-center">
            Si vous avez aimé cette article, vous pouvez nous laisser un
            commentaire
          </h5>

          <form-comment :articleId="article.id"></form-comment>
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
      textapropos: "",
      lastArticles: [],
      showFormResponse: false,
      commentToResponse: {},
    };
  },
  watch: {
    $route() {
      this.loadArticle(false);
    },
  },
  async mounted() {
    this.loadArticle(true);
  },
  methods: {
    getImageComment(comment) {
      //return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
      return `${process.env.VUE_APP_SERVER_URL}/comments/${comment.id}/image`;
    },
    getImage() {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${this.article.id}/image')`;
    },
    async loadArticle(withAside) {
      let params = {
        aside: withAside,
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
    showRresponseComment(comment) {
      this.showFormResponse = true;
      this.commentToResponse = comment;
    },
    closeformResponse() {
      this.showFormResponse = false;
      this.commentToResponse = {};
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
.img-comment {
  border-radius: 50%;
  width: 100%;
}
.comment {
  border-bottom: 1px solid #dddddd;
}
img.template-image-one {
  max-width: 100%;
}
@media (min-width: 992px) {
  .logo {
    margin-bottom: 80px;
    width: 150px;
  }
  .img-comment {
    width: 50%;
  }
}
</style>
