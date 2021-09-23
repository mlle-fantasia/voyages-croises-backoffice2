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
      <form-category :catId="categoryToEdit.id" @saved="saved"></form-category>
    </div>
    <!-- Les tags -->
    <div class="d-flex align-items-center">
      <h2>Les Tags</h2>
      <button @click="addTag" class="btn btn-warning ms-5">Nouveau</button>
    </div>
    <div class="row articles-list mt-3">
      <div class="col-md-6" v-for="tag in tags" :key="tag.id">
        <div class="card-article d-flex align-items-center">
          <div class="ms-2">
            <div class="fw-bold">{{ tag.text }}</div>
            <div>{{ tag.articles.length }} articles</div>
          </div>
          <div class="flex-grow-1"></div>
          <div>
            <button @click="editTag(tag)" class="btn btn-primary btn-sm">
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showFormTag">
      <form-tag :tagId="tagToEdit.id" @saved="saved"></form-tag>
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
      tags: [],
      showFormTag: false,
      tagToEdit: {},
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
      this.categories = response.data.categories;
      this.tags = response.data.tags;
    },
    /* les catégories */
    editCategory(cat) {
      this.showFormCat = true;
      this.categoryToEdit = cat;
    },
    addCategory() {
      this.showFormCat = true;
      this.categoryToEdit = { id: 0 };
    },
    /* les tags */
    editTag(tag) {
      this.showFormTag = true;
      this.tagToEdit = tag;
    },
    addTag() {
      this.showFormTag = true;
      this.tagToEdit = { id: 0 };
    },
    /* les deux */
    saved() {
      this.showFormTag = false;
      this.tagToEdit = {};
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
