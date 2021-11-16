<template>
  <div class="admin-articles">
    <div class="d-flex align-items-center">
      <h4>Impotez et modifiez vos images ici</h4>
    </div>
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="showImages ? 'active' : ''"
            aria-current="page"
            @click="changeOnglet('Images')"
            >Images</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="showImport ? 'active' : ''"
            @click="changeOnglet('Import')"
            >Importer</a
          >
        </li>
      </ul>
    </div>
    <div v-if="showImages">
      <div class="row mt-3">
        <div class="col-md-8">
          <h6>Les images déjà importées dans votre bibliothèque</h6>
          <div class="d-flex flex-wrap" v-if="files.length > 0">
            <div v-for="file in files" :key="file.id" class="mx-2 my-2">
              <div class="relative">
                <img
                  :class="imageSelected.id === file.id ? 'image-selected' : ''"
                  @click="selectImage(file)"
                  :src="getSRCImage(file.id)"
                  :alt="file.alt"
                  class="bibli-miniature pointer"
                />
                <div class="checkbox-image" v-if="multiple">
                  <input
                    @input="selectImageMultiple"
                    v-model="file.selected"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h6>Données de l'image</h6>
          <!--           <div>
            <label class="form-label mb-0" for="valuecat">Nom</label>
            <br />
            <input
              class="form-control"
              name="alt"
              id="alt"
              v-model="imageSelected.name"
              type="text"
            />
          </div> -->
          <div>
            <label class="form-label mb-0" for="valuecat"
              >Text alternatif</label
            >
            <br />
            <input
              class="form-control"
              name="alt"
              id="alt"
              v-model="imageSelected.alt"
              type="text"
            />
          </div>
          <div>
            <label class="form-label mb-0" for="valuecat">Description</label>
            <br />
            <textarea
              class="form-control"
              name="description"
              id="description"
              v-model="imageSelected.description"
            ></textarea>
          </div>
          <div class="mt-3">
            <button
              :disabled="!imageSelected.id"
              @click="saveImage"
              class="btn btn-primary"
            >
              Enregistrer
            </button>
            <button
              :disabled="!imageSelected.id"
              @click="deleteImage"
              class="btn btn-danger ms-2"
            >
              Supprimer image
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showImport">
      <div class="row mt-3">
        <div class="col-md-8">
          <h6>Importez ici de nouvelles impages depuis votre ordinateur</h6>
          <div class="mb-2">
            <input
              type="file"
              class="form-control"
              ref="inputMainImage"
              name="inputMainImage"
              id="inputMainImage"
              accept="image/png, image/jpeg"
              multiple
              @change="fileJusteSelected($event)"
            />
          </div>
          <div class="d-flex" v-if="filesToUpload.length > 0">
            <div
              v-for="file in filesToUpload"
              :key="file.index"
              class="mx-2 my-2"
            >
              <img
                :class="
                  imageToUploadSelected.index === file.index
                    ? 'image-selected'
                    : ''
                "
                @click="selectImageToUpload(file)"
                :src="file.binary"
                alt=""
                class="bibli-miniature pointer"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h6>Données de l'image</h6>
          <!--           <div>
            <label class="form-label mb-0" for="valuecat">Nom</label>
            <br />
            <input
              class="form-control"
              name="alt"
              id="alt"
              v-model="imageToUploadSelected.name"
              type="text"
            />
          </div> -->
          <div>
            <label class="form-label mb-0" for="valuecat"
              >Text alternatif</label
            >
            <br />
            <input
              class="form-control"
              name="alt"
              id="alt"
              v-model="imageToUploadSelected.alt"
              type="text"
            />
          </div>
          <div>
            <label class="form-label mb-0" for="valuecat">Description</label>
            <br />
            <textarea
              class="form-control"
              name="description"
              id="description"
              v-model="imageToUploadSelected.description"
            ></textarea>
          </div>
        </div>
        <div class="mt-3">
          <button
            :disabled="!filesToUpload.length"
            @click="uploadImages"
            class="btn btn-primary"
          >
            Enregistrer les images
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LibraryImage",
  props: {
    multiple: Boolean,
  },
  data() {
    return {
      showImages: true,
      showImport: false,
      files: [],
      imageSelected: {},
      imagesMultipleSelected: [],
      filesToUpload: [],
      imageToUploadSelected: {},
    };
  },
  async mounted() {
    this.imagesSelected = [];
    this.loadImages();
  },
  methods: {
    getSRCImage(id) {
      return `${process.env.VUE_APP_SERVER_URL}/admin/files/${id}/miniature`;
    },
    selectImage(file) {
      this.imageSelected = file;
      // this.imagesSelected.push(file);
      if (!this.canSelectMultiple)
        this.$emit("imageSelected", this.imageSelected.id);
    },
    selectImageMultiple() {
      this.imagesMultipleSelected = this.files.filter((image) => {
        return image.selected;
      });
      this.$emit("imagesMultipleSelected", this.imagesMultipleSelected);
    },
    changeOnglet(onglet) {
      this.showImages = false;
      this.showImport = false;
      this["show" + onglet] = true;
      if (onglet === "Images") this.loadImages();
    },
    async loadImages() {
      this.imageSelected = {};
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL + "/admin/files/list",
        { params: { type: "library" } }
      );
      this.files = response.data;
    },
    showImage() {
      if (this.mainImage.binary)
        return "background-image:url(" + this.mainImage.binary + ")";
    },
    async saveImage() {
      if (!this.imageSelected.id) return;
      let response = await this.$axios.put(
        process.env.VUE_APP_SERVER_URL +
          "/admin/files/" +
          this.imageSelected.id,
        this.imageSelected
      );
      this.imageSelected = response.data;
    },
    async deleteImage() {
      if (!this.imageSelected.id) return;
      await this.$axios.delete(
        process.env.VUE_APP_SERVER_URL + "/admin/files/" + this.imageSelected.id
      );
      this.loadImages();
    },
    /* upload */
    selectImageToUpload(file) {
      this.imageToUploadSelected = file;
    },
    fileJusteSelected($event) {
      if (!$event.target.files.length) return;
      for (let index = 0; index < $event.target.files.length; index++) {
        const file = $event.target.files[index];
        let image = { image: file, binary: "", index: index };
        var reader = new FileReader();
        reader.onload = (function () {
          return function (e) {
            image.binary = e.target.result;
          };
        })(file);
        this.filesToUpload.push(image);
        reader.readAsDataURL(file);
      }
    },
    async uploadImages() {
      this.filesToUpload.map((file) => {
        file.binary = "";
      });
      let response = await this.$axios.post(
        process.env.VUE_APP_SERVER_URL + "/admin/files",
        this.filesToUpload
      );
      console.log("response", response);
      for (let i = 0; i < this.filesToUpload.length; i++) {
        const image = this.filesToUpload[i];
        let formData = new FormData();
        formData.append("image", image.image, image.image.name);
        let id = response.data.find((f) => {
          return f.index === image.index;
        });
        await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/admin/files/" + id.id + "/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      this.changeOnglet("Images");
    },
  },
};
</script>
<style lang="scss" scoped>
.bibli-miniature {
  max-width: 200px;
}
.image-selected {
  box-shadow: #0c6efd 1px 0px 8px 3px;
}
.checkbox-image {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
