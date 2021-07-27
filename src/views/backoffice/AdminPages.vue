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
          <div>
            <button
              @click.stop="deletePage(page)"
              class="btn btn-danger btn-sm"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <button @click="addPage" class="btn btn-warning">Nouvelle page</button>
      </div>
    </div>
    <div class="row" v-if="formAddPage">
      <form-page @saved="pageSaved"></form-page>
    </div>
  </div>
</template>

<script>
import FormPage from "./FormPage.vue";
// @ is an alias to /src

export default {
  name: "AdminPages",
  components: { FormPage },
  data() {
    return {
      pages: [],
      formAddPage: false,
      page: {},
      mainImage: { image: null, binary: null },
    };
  },
  async mounted() {
    this.loadPages();
  },
  methods: {
    getImage() {
      if (this.mainImage.binary)
        return "background-image:url(" + this.mainImage.binary + ")";
      else
        return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${this.article.id}/image')`;
    },
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
      if (this.mainImage.image) await this.saveImage();
      this.formAddPage = false;
      this.loadPages();
    },
    // image
    fileJusteSelected($event) {
      if (!$event.target.files.length) return;
      this.mainImage.image = $event.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.onload = (function () {
        return function (e) {
          that.mainImage.binary = e.target.result;
        };
      })($event.target.files[0]);
      reader.readAsDataURL($event.target.files[0]);
    },
    async saveImage() {
      console.log("je passe");
      let file = this.mainImage.image;
      if (!file) return;
      let formData = new FormData();
      formData.append("image", file, file.name);
      await this.$axios.post(
        process.env.VUE_APP_SERVER_URL +
          "/admin/pages/" +
          this.page.id +
          "/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.mainImage = { image: null, binary: null };
    },
    async deletePage(page) {
      await this.$axios.delete(
        process.env.VUE_APP_SERVER_URL + "/admin/pages/delete/" + page.id
      );
      this.loadPages();
      //console.log("response", response);
    },
    pageSaved() {
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
.main-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 230px;
}
@media (min-width: 992px) {
  .miniature {
    width: 130px;
  }
}
</style>
