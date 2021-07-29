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
          <div class="bg-image miniature" :style="getImage(page.id)"></div>
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
    };
  },
  async mounted() {
    this.loadPages();
  },
  methods: {
    getImage(id) {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/pages/${id}/image')`;
    },
    async loadPages() {
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL + "/admin/pages/list"
      );
      this.pages = response.data;
    },
    editPage(page) {
      this.$router.push("/admin/pages/" + page.id);
    },
    addPage() {
      this.formAddPage = true;
    },
    pageSaved() {
      this.formAddPage = false;
      this.loadPages();
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>
