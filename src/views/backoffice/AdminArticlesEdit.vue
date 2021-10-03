<template>
  <!-- ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION -->
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

        <div class="col-md-12" v-if="article.contenu">
          <div class="mb-3">
            <label class="form-label" for="contenu">Contenu de l'article</label>
            <jodit-editor
              name="contenu"
              id="contenu"
              v-model="article.contenu"
              :buttons="buttons"
              :config="{ uploader: { insertImageAsBase64URI: true } }"
            />
          </div>
          <div class="row mb-4">
            <h5>Catégories</h5>
            <div class="col-md-6">
              <label for="">Catégorie</label>
              <v-select
                v-model="categorieSeleted"
                :options="categories"
                label="text"
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
              <div>
                <label for="">Tags</label>
                <v-select
                  :multiple="true"
                  v-model="tagsSeleted"
                  :options="tags"
                  label="text"
                ></v-select>
                <button
                  @click="formAddTag = !formAddTag"
                  class="btn btn-sm btn-primary mt-2"
                >
                  créer un nouveau tag
                </button>
                <div class="mt-3 bg-light p-2" v-if="formAddTag">
                  <div class="mb-3">
                    <label class="form-label mb-0" for="textsubcat">Nom</label>
                    <br />
                    <input
                      class="form-control"
                      name="textsubcat"
                      id="textsubcat"
                      v-model="newTag.text"
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
                      v-model="newTag.value"
                      type="text"
                    />
                  </div>
                  <button @click="addTag" class="btn btn-sm btn-primary mt-2">
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
          <div class="">
            <button @click="saveArticle" class="btn btn-primary">
              Enregistrer
            </button>
            <button @click="deleteArticle" class="btn btn-danger ms-2">
              Supprimer
            </button>
          </div>
          <!--           <div
            class="grid"
            v-masonry="containerId"
            transition-duration="0.3s"
            item-selector=".item"
          >
            <div class="item mb-4" v-masonry-tile>
              <img
                class="img-fluid template-image-masonery"
                :src="getimagetest(11)"
                alt="image"
              />
            </div>
            <div class="item mb-4" v-masonry-tile>
              <img
                class="img-fluid template-image-masonery"
                :src="getimagetest(12)"
                alt="image"
              />
            </div>
            <div class="item mb-4" v-masonry-tile>
              <img
                class="img-fluid template-image-masonery"
                :src="getimagetest(13)"
                alt="image"
              />
            </div>
            <div class="item mb-4" v-masonry-tile>
              <img
                class="img-fluid template-image-masonery"
                :src="getimagetest(14)"
                alt="image"
              />
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!--     <div class="row">
      <div class="col-md-12">
         <h5>Les commentaires de l'article</h5>
         <div v-for="com in article.comments" :key="com.id">
         </div>
      </div>
    </div> -->
    <modal-confirm
      v-model="deleteConfirm"
      :text="`Voulez-vous supprimer cet article : ${article.title} ?`"
      @canceled="deleteConfirm = false"
      @confirmed="deleteArticleConfirmed"
    ></modal-confirm>
    <modal-library-images
      v-model="showLibrary"
      :templateSeleted="templateSeleted"
      @imageSelected="imageSelected"
    ></modal-library-images>
  </div>
</template>

<script>
export default {
  name: "AdminArticleEdit",
  components: {},
  data() {
    return {
      article: {},
      deleteConfirm: false,
      mainImage: { image: null, binary: null },
      categories: [],
      categorieSeleted: {},
      tags: [],
      tagsSeleted: [],
      formAddCategorie: false,
      newCaterory: { text: "", value: "" },
      formAddTag: false,
      newTag: { text: "", value: "" },
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
        "center",
        "right",
        "|",
        "video",
        "file",
        "link",
        "|",
        {
          that: this,
          name: "Image",
          iconURL: `${process.env.VUE_APP_SERVER_URL}/files/iconimage1`,
          exec: function (editor) {
            console.log("coucou this", this);
            this.that.bibliImage(editor, "one");
          },
        },
        {
          that: this,
          name: "Image",
          iconURL: `${process.env.VUE_APP_SERVER_URL}/files/iconimage2`,
          exec: function (editor) {
            console.log("coucou this", this);
            this.that.bibliImage(editor, "flex");
          },
        },
        /*         {
          that: this,
          name: "Image",
          iconURL: `${process.env.VUE_APP_SERVER_URL}/files/iconimage3`,
          exec: function (editor) {
            console.log("coucou this", this);
            this.that.bibliImage(editor, "masonry");
          },
        }, */
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
      showLibrary: false,
      editor: {},
      templateSeleted: "",
    };
  },
  async mounted() {
    this.loadArticles();
  },
  watch: {},
  methods: {
    /* getimagetest(id) {
      return `${process.env.VUE_APP_SERVER_URL}/files/${id}`;
    }, */
    getImage() {
      if (this.mainImage.binary)
        return "background-image:url(" + this.mainImage.binary + ")";
      else
        return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${this.article.id}/image')`;
    },
    async loadArticles() {
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL +
          "/admin/articles/" +
          this.$route.params.id
      );
      console.log(response);
      this.article = response.data.article;
      this.categorieSeleted = this.article.category;
      this.tagsSeleted = this.article.tags;
      this.categories = response.data.categories;
      this.tags = response.data.tags;
    },
    imageSelected(id) {
      let html = "";
      if (Number.isInteger(id)) {
        html =
          "{{{insertImage:" + id + ":template:" + this.templateSeleted + "}}}";
      } else {
        let tabIds = [];
        for (let i = 0; i < id.length; i++) {
          const file = id[i];
          tabIds.push(file.id);
        }
        html =
          "{{{insertImage:" +
          tabIds.join(",") +
          ":template:" +
          this.templateSeleted +
          "}}}";
      }
      this.editor.s.insertHTML(html);
      this.editor = {};
      this.templateSeleted = "";
    },
    bibliImage(editor, template) {
      console.log("bibliImage", template);
      this.showLibrary = true;
      this.editor = editor;
      this.templateSeleted = template;
      //editor.s.insertHTML(new Date().toDateString());
    },
    async addTag() {
      let response = await this.$axios.post(
        process.env.VUE_APP_SERVER_URL + "/admin/tag/add",
        this.newTag
      );
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
          text: "tag ajoutée!",
        });
        this.loadArticles();
        this.formAddTag = false;
        this.newTag = { text: "", value: "" };
      }
    },
    async addCategorie() {
      let response = await this.$axios.post(
        process.env.VUE_APP_SERVER_URL + "/admin/categories/add",
        this.newCaterory
      );
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
          text: "Catégorie ajoutée!",
        });
        this.loadArticles();
        this.formAddCategorie = false;
        this.newCaterory = { text: "", value: "" };
      }
    },
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
      console.log("je passe", this.article);
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
      // champs obligatoires
      if (
        this.article.visible &&
        (!this.article.date ||
          !this.categorieSeleted.id ||
          !this.article.title ||
          !this.article.contenu)
      ) {
        this.$notify({
          group: "message",
          type: "error",
          title: "Erreur",
          text: "Vérifiez les champs obligatoires : date, catégorie, titre,  contenu ",
        });
        return;
      }

      this.article.category = this.categorieSeleted.id;
      this.article.tags = this.tags;
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
        this.article = response.data;
        this.$notify({
          group: "message",
          type: "success",
          title: "Confirmation",
          text: "Article bien entregistré!",
        });
        if (this.mainImage.image) await this.saveImage();
      }
      this.$router.push("/admin/articles");
    },
    deleteArticle() {
      this.deleteConfirm = true;
    },
    async deleteArticleConfirmed() {
      await this.$axios.delete(
        process.env.VUE_APP_SERVER_URL + "/admin/articles/" + this.article.id,
        this.article
      );
      this.deleteConfirm = false;
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
