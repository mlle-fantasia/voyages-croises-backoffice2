<template>
  <div class="admin-articles">
    <div class="d-flex align-items-center">
      <h2>Les catégories</h2>
      <button @click="addCategory" class="btn btn-warning ms-5">
        Nouvelle
      </button>
    </div>
    <div class="row articles-list mt-3">
      <div class="col-md-6" v-for="categorie in categories" :key="categorie.id">
        <div class="card-article d-flex align-items-center">
          <div class="ms-2">
            <div class="fw-bold">{{ categorie.text }}</div>
            <div>{{ categorie.articles.length }} articles</div>
          </div>
          <div class="flex-grow-1"></div>
          <div>
            <button
              @click="editCategory(categorie)"
              class="btn btn-primary btn-sm"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showFormCat">
      <form-category
        :catId="categoryToEdit.id"
        @saved="categorySaved"
      ></form-category>
    </div>
  </div>
</template>

<script>
import FormCategory from "./FormCategory.vue";
// @ is an alias to /src

export default {
  name: "AdminCategories",
  components: { FormCategory },
  data() {
    return {
      categories: [],
      showFormCat: false,
      categoryToEdit: {},
    };
  },
  async mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL + "/admin/categories/list"
      );
      console.log(response);
      this.categories = response.data;
    },
    editCategory(cat) {
      this.showFormCat = true;
      this.categoryToEdit = cat;
    },
    addCategory() {
      this.showFormCat = true;
      this.categoryToEdit = { id: 0 };
    },
    categorySaved() {
      this.showFormCat = false;
      this.categoryToEdit = {};
      this.loadCategories();
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
</style>
