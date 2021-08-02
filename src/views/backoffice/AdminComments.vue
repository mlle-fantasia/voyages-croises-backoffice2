<template>
  <div>
    <h2>Les commentaires</h2>
    <h5>{{ comments.length }} commentaires non publiés</h5>
    <div class="row">
      <div class="col-md-6" v-for="com in comments" :key="com.id">
        <div class="card-comment">
          <div>Nom : {{ com.name }}</div>
          <div>Email : {{ com.email }}</div>
          <div>Titre : {{ com.title }}</div>
          <div>Commentaire : {{ com.contenu }}</div>
          <div>Site web : {{ com.sitweb }}</div>
          <button @click="hideOrShow(com)" class="btn btn-primary btn-sm">
            {{ com.visible ? "Masquer" : "Publier" }}
          </button>
          <button @click="deleteCom(com)" class="btn btn-danger btn-sm ms-2">
            Supprimer
          </button>
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
      comments: [],
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/admin/comments"
    );
    console.log(response);
    this.comments = response.data;
  },
  methods: {
    getImage(article) {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${article.id}/image')`;
    },
    async hideOrShow(comment) {
      await this.$axios.put(
        process.env.VUE_APP_SERVER_URL + "/admin/comments/" + comment.id,
        { visible: !comment.visible }
      );
    },
    async deleteCom(comment) {
      await this.$axios.delete(
        process.env.VUE_APP_SERVER_URL + "/admin/comments/" + comment.id
      );
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
</style>
