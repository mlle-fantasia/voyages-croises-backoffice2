<template>
  <div class="admin-home">
    <h2>Tableau de bord</h2>
    <div class="row mt-3">
      <div class="col-md-8">
        <h5>Dernier article publié par vous</h5>
        <div
          class="card-article d-flex align-items-center"
          v-if="lastArticleUser.id"
        >
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
        <div
          class="card-article d-flex align-items-center"
          v-if="lastArticle.id"
        >
          <div
            class="bg-image miniature"
            :style="getImage(lastArticle.id)"
          ></div>
          <div class="ms-2 fw-bold">
            {{ lastArticle.title }}
          </div>
          <div class="flex-grow-1"></div>
          <div class="">oui</div>
        </div>
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
        <div
          class="card-admin text-center"
          :class="nbComNotVisible > 0 ? 'comNotVisible' : ''"
        >
          <div class="h2">{{ nbComNotVisible }}</div>
          <div>Commentaires à traiter</div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card-admin text-center">
          <div class="h2">{{ nbCategories }}</div>
          <div>catégories</div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card-admin text-center">
          <div class="h2">{{ nbTags }}</div>
          <div>tags</div>
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
      nbArticle: 0,
      nbComVisible: 0,
      nbComNotVisible: 0,
      nbCategories: 0,
      nbTags: 0,
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/admin/home"
    );
    this.lastArticle = response.data.lastArticle;
    this.lastArticleUser = response.data.lastArticleUser;
    this.nbArticle = response.data.nbArticle;
    this.nbComVisible = response.data.nbComVisible;
    this.nbComNotVisible = response.data.nbComNotVisible;
    this.nbCategories = response.data.nbCategories;
    this.nbTags = response.data.nbTags;
  },
  methods: {
    getImage(id) {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${id}/image')`;
    },
  },
};
</script>
<style lang="scss" scoped>
.comNotVisible {
  border: 1px solid #d65454;
  box-shadow: #e0a7a7 0px 1px 8px 3px;
}
</style>
