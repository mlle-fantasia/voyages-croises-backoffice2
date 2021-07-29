<template>
  <div class="form-addpage">
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
            disabled
          />
        </div>
      </div>
    </div>
    <div class="row d-flex align-items-end">
      <div class="col-md-6">
        <div class="d-flex align-items-center mb-3">
          <div class="me-2 fw-bold">Afficher une image principale</div>
          <label class="switch">
            <input v-model="page.have_image" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="col-md-6" v-if="page.have_image">
        <div class="mb-2">
          <label class="form-label" for="inputMainImage">Image</label>
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
          v-if="mainImage.binary || page.image"
          class="mb-3 main-image"
          :style="getImage()"
        ></div>
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
</template>

<script>
// @ is an alias to /src

export default {
  name: "FormPage",
  components: {},
  props: {
    pageId: [Number, String],
  },
  data() {
    return {
      page: {},
      mainImage: { image: null, binary: null },
    };
  },
  async mounted() {
    this.loadPage();
  },
  methods: {
    getImage() {
      if (this.mainImage.binary)
        return "background-image:url(" + this.mainImage.binary + ")";
      else
        return `background-image:url('${process.env.VUE_APP_SERVER_URL}/articles/${this.article.id}/image')`;
    },
    async loadPage() {
      if (this.pageId) {
        let response = await this.$axios.get(
          process.env.VUE_APP_SERVER_URL + "/admin/pages/" + this.pageId
        );
        console.log("response", response);
        this.page = response.data;
      }
    },
    editPage(page) {
      console.log("page", page);
      this.$router.push("/admin/pages/" + page.id);
    },
    async savePage() {
      let response;
      console.log("this.pageId", this.pageId);
      if (this.pageId) {
        response = await this.$axios.put(
          process.env.VUE_APP_SERVER_URL + "/admin/pages/" + this.pageId,
          this.page
        );
      } else {
        response = await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/admin/pages/add",
          this.page
        );
      }
      console.log(response);
      if (this.mainImage.image) await this.saveImage();
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
          text: "Page bien entregistrée !",
        });
      }

      this.loadPage();
      this.$emit("saved");
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
