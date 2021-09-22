<template>
  <div class="form-editcat">
    <div class="row">
      <div class="mt-3 p-2">
        <div class="mb-3">
          <label class="form-label mb-0" for="textcat">Nom</label>
          <br />
          <input
            class="form-control"
            name="textcat"
            id="textcat"
            v-model="category.text"
            type="text"
          />
        </div>
        <div class="mb-3">
          <label class="form-label mb-0" for="valuecat">Clé</label>
          <br />
          <input
            class="form-control"
            name="valuecat"
            id="valuecat"
            v-model="category.value"
            type="text"
          />
        </div>
        <button @click="saveCategory" class="btn btn-primary mt-2">
          Enregistrer
        </button>
        <button
          v-if="catId"
          @click="deleteCategory"
          class="btn btn-danger mt-2 ms-2"
          :disabled="category.articles.length > 0"
        >
          Supprimer
        </button>
      </div>
    </div>
    <modal-confirm
      v-model="deleteConfirm"
      :text="`Voulez-vous supprimer cette catégorie : ${category.text}  ?`"
      @canceled="deleteConfirm = false"
      @confirmed="deleteCategoryConfirmed"
    ></modal-confirm>
  </div>
</template>

<script>
export default {
  name: "FormCategory",
  components: {},
  props: {
    catId: [Number, String],
  },
  data() {
    return {
      category: {},
      deleteConfirm: false,
    };
  },
  async mounted() {
    this.loadCategory();
  },
  watch: {
    catId() {
      this.loadCategory();
    },
  },
  methods: {
    async loadCategory() {
      if (this.catId) {
        let response = await this.$axios.get(
          process.env.VUE_APP_SERVER_URL + "/admin/categories/" + this.catId
        );
        this.category = response.data;
      }
    },
    async saveCategory() {
      let response;
      if (this.catId) {
        response = await this.$axios.put(
          process.env.VUE_APP_SERVER_URL + "/admin/categories/" + this.catId,
          this.category
        );
      } else {
        response = await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/admin/categories/add",
          this.category
        );
      }
      if (response.status !== 200) {
        this.$notify({
          group: "message",
          type: "error",
          title: "Erreur",
          text: "une erreur s'est produite ",
        });
      } else {
        this.$notify({
          group: "message",
          type: "success",
          title: "Confirmation",
          text: "Categorie bien entregistrée !",
        });
      }
      this.$emit("saved");
    },

    deleteCategory() {
      this.deleteConfirm = true;
    },
    async deleteCategoryConfirmed() {
      await this.$axios.delete(
        process.env.VUE_APP_SERVER_URL +
          "/admin/categories/delete/" +
          this.category.id
      );
      this.deleteConfirm = false;
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
.form-editcat {
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
