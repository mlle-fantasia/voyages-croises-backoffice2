<template>
  <div class="admin-home">
    <h2>Tableau de bord</h2>
    <div class="row mt-3">
      <div class="col-md-8">
        <h5>Dernier article publié par vous</h5>
        <div class="card-article d-flex align-items-center">
          <div
            class="bg-image miniature"
            :style="getImage(lastArticleUser.id)"
          ></div>
          <div class="ms-2 fw-bold">
            {{ lastArticleUser.title }}
          </div>
          <div class="flex-grow-1"></div>
          <div class="">oui</div>
        </div>
      </div>
      <div class="col-md-4">
        <h5>Dernier article publié sur le site</h5>
      </div>
    </div>
    <div class="row mt-4">
      <h5>Quelques chiffres</h5>
      <div class="col-md-2">
        <div class="card-admin text-center">
          <div class="h2">{{ nbArticle }}</div>
          <div>articles visibles</div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card-admin text-center">
          <div class="h2">{{ nbComVisible }}</div>
          <div>Commentaires visibles</div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card-admin text-center">
          <div class="h2">{{ nbComNotVisible }}</div>
          <div>Commentaires à traiter</div>
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
      lastArticle: {},
      lastArticleUser: {},
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/admin/home"
    );
    console.log(response);
    this.lastArticle = response.data.lastArticle;
    this.lastArticleUser = response.data.lastArticleUser;
    this.nbArticle = response.data.nbArticle;
    this.nbComVisible = response.data.nbComVisible;
    this.nbComNotVisible = response.data.nbComNotVisible;
  },
  methods: {
    getImage(id) {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${id}/image')`;
    },
  },
};
</script>
