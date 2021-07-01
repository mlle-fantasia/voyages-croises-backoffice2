<template>
  <div class="admin-articles">
    <div class="d-flex flex-column">
      <h2>Edition d'un article</h2>
      <h4>{{ article.title }}</h4>
    </div>
    <div class="row article-formulaire mt-3">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label" for="title">Titre</label>
              <br />
              <input
                class="form-control"
                name="title"
                id="title"
                v-model="article.title"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="resume">Résumé</label>
              <br />
              <textarea
                class="form-control"
                name="resume"
                id="resume"
                v-model="article.resume"
                type="textarea"
                rows="4"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <label class="form-label" for="title">Date</label>
              <br />
              <input
                class="form-control"
                name="date"
                id="date"
                v-model="article.date"
                type="date"
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="mb-2">
              <label class="form-label" for="inputMainImage"
                >Image principale</label
              >
              <input
                type="file"
                class="form-control"
                ref="inputMainImage"
                name="inputMainImage"
                id="inputMainImage"
                accept="image/png, image/jpeg"
                @change="fileJusteSelected($event)"
              />
            </div>
            <div
              v-if="mainImage.binary || article.image"
              class="mb-3 main-image"
              :style="getImage()"
            ></div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label" for="contenu">Contenu de l'article</label>
            <jodit-editor
              name="contenu"
              id="contenu"
              v-model="article.contenu"
              :buttons="buttons"
              :insertImageAsBase64URI="true"
            />
          </div>
          <div class="row mb-4">
            <h5>Catégories</h5>
            <div class="col-md-6">
              <label for="">Catégorie</label>
              <v-select
                v-model="categorieSeleted"
                :options="categories"
              ></v-select>
              <button
                @click="formAddCategorie = !formAddCategorie"
                class="btn btn-sm btn-primary mt-2"
              >
                Ajouter une catégorie
              </button>
              <div class="mt-3 bg-light p-2" v-if="formAddCategorie">
                <div class="mb-3">
                  <label class="form-label mb-0" for="textcat">Nom</label>
                  <br />
                  <input
                    class="form-control"
                    name="textcat"
                    id="textcat"
                    v-model="newCaterory.text"
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
                    v-model="newCaterory.value"
                    type="text"
                  />
                </div>
                <button
                  @click="addCategorie"
                  class="btn btn-sm btn-primary mt-2"
                >
                  Ajouter
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <div v-if="categorieSeleted">
                <label for="">Sous-catégorie</label>
                <v-select
                  v-model="subCategorieSeleted"
                  :options="subCategories"
                ></v-select>
                <button
                  @click="formAddSubCategorie = !formAddSubCategorie"
                  class="btn btn-sm btn-primary mt-2"
                >
                  Ajouter une Sous-catégorie dans {{ categorieSeleted.text }}
                </button>
                <div class="mt-3 bg-light p-2" v-if="formAddSubCategorie">
                  <div class="mb-3">
                    <label class="form-label mb-0" for="textsubcat">Nom</label>
                    <br />
                    <input
                      class="form-control"
                      name="textsubcat"
                      id="textsubcat"
                      v-model="newSubCaterory.text"
                      type="text"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label mb-0" for="valuesubcat">Clé</label>
                    <br />
                    <input
                      class="form-control"
                      name="valuesubcat"
                      id="valuesubcat"
                      v-model="newSubCaterory.value"
                      type="text"
                    />
                  </div>
                  <button
                    @click="addSubCategorie"
                    class="btn btn-sm btn-primary mt-2"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="d-flex align-items-center mb-3">
              <div class="me-2 fw-bold">Article visible sur le site</div>
              <label class="switch">
                <input v-model="article.visible" type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="row d-flex">
            <button @click="saveArticle" class="btn btn-primary">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminArticleEdit",
  components: {},
  data() {
    return {
      article: {},
      mainImage: { image: null, binary: null },
      categories: [],
      categorieSeleted: {},
      subCategories: [],
      subCategorieSeleted: {},
      formAddCategorie: false,
      newCaterory: { text: "", value: "" },
      formAddSubCategorie: false,
      newSubCaterory: { text: "", value: "" },
      buttons: [
        "source",
        "|",
        "bold",
        "underline",
        "italic",
        "font",
        "fontsize",
        "paragraph",
        "brush",
        "|",
        "ul",
        "ol",
        "indent",
        "outdent",
        "left",
        "|",
        "image",
        "video",
        "file",
        "link",
        "|",
        "hr",
        "table",
        "symbol",
        "|",
        "selectall",
        "undo",
        "redo",
        "find",
        "preview",
      ],
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL +
        "/admin/articles/" +
        this.$route.params.id
    );
    console.log(response);
    this.article = response.data.article;
    this.categorieSeleted = this.article.category;
    this.subCategorieSeleted = this.article.subcategory;
    this.categories = response.data.categories;
  },
  watch: {
    categorieSeleted: function (val) {
      console.log("load subcat", val);
      this.subCategories = val.subcategories;
    },
  },
  methods: {
    getImage() {
      if (this.mainImage.binary)
        return "background-image:url(" + this.mainImage.binary + ")";
      else
        return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${this.article.id}/image')`;
    },
    addSubCategorie() {},
    addCategorie() {},
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
          "/admin/articles/" +
          this.article.id +
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
    async saveArticle() {
      this.article.category = this.categorieSeleted.id;
      this.article.subcategory = this.subCategorieSeleted.id;
      console.log("this.article", this.article);
      let response;
      if (this.article.id) {
        response = await this.$axios.put(
          process.env.VUE_APP_SERVER_URL + "/admin/articles/" + this.article.id,
          this.article
        );
      } else {
        response = await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/admin/articles/add",
          this.article
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
          text: "Article bien entregistré!",
        });
        console.log("this.mainImage", this.mainImage);
        if (this.mainImage.image) await this.saveImage();
      }
      this.$router.push("/admin/articles");
    },
  },
};
</script>
<style lang="scss" scoped>
.main-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 230px;
}
</style>
