<template>
  <div class="admin-articles">
    <div class="d-flex align-items-center">
      <h2>Les pages du site</h2>
    </div>
    <div class="row articles-list mt-3">
      <div
        v-for="page in pages"
        :key="page.id"
        @click="editPage(page)"
        class="col-md-6"
      >
        <div class="card-article d-flex align-items-center">
          <div class="bg-image miniature img-accueil"></div>
          <div class="ms-2 fw-bold">{{ page.name }}</div>
          <div class="flex-grow-1"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <button @click="addPage" class="btn btn-warning">Nouvelle page</button>
      </div>
    </div>
    <div class="row" v-if="formAddPage">
      <div class="col-md-12 form-addpage">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label" for="title">Nom de la page</label>
              <br />
              <input
                class="form-control"
                name="title"
                id="title"
                v-model="page.name"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label" for="title">Clé</label>
              <br />
              <input
                class="form-control"
                name="title"
                id="title"
                v-model="page.key"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="me-2 fw-bold">page dans le menu principal</div>
          <label class="switch">
            <input v-model="page.in_menuprincipal" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="me-2 fw-bold">page dans le menu pied de page</div>
          <label class="switch">
            <input v-model="page.in_menufooter" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div>
          <button @click="savePage" class="btn btn-warning">Enregistrer</button>
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
      pages: [],
      formAddPage: false,
      page: {},
    };
  },
  async mounted() {
    this.loadPages();
  },
  methods: {
    async loadPages() {
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL + "/admin/pages/list"
      );
      console.log(response);
      this.pages = response.data;
    },
    editPage(page) {
      console.log("page", page);
      this.$router.push("/admin/pages/" + page.id);
    },
    addPage() {
      this.formAddPage = true;
    },
    async savePage() {
      let response = await this.$axios.post(
        process.env.VUE_APP_SERVER_URL + "/admin/pages/add",
        this.page
      );
      console.log(response);

      this.formAddPage = false;
      this.loadPages();
    },
  },
};
</script>
<style lang="scss" scoped>
.miniature {
  width: 65px;
  height: 65px;
  border-radius: 15px;
}
.img-accueil {
  background-image: url("/img/loginfond.jpg");
}
.img-apropos {
  background-image: url("/img/lionel2.jpg");
}
.img-contact {
  background-image: url("/img/alexandre1.jpg");
}
.card-article {
  cursor: pointer;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #eae8e8;
  box-shadow: lightgrey 0px 1px 2px 0px;
  margin-bottom: 15px;
  padding: 5px 12px;
}
.form-addpage {
  margin-top: 20px;
  padding: 20px 50px;
  background-color: #f5f1ed;
  border-radius: 10px;
}
@media (min-width: 992px) {
  .miniature {
    width: 130px;
  }
}
</style>
