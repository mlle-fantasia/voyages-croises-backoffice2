<template>
  <div class="admin-home">
    <h2>Les images instagram</h2>
    <h5>Minimum 8 images :</h5>
    <!-- formulaire -->
    <div class="row">
      <div class="col-md-4" v-for="file in files" :key="file.id">
        <input-file
          label="Image"
          :id="file.id"
          classImage="instagram"
          :routeImage="`/files/${file.id}/instagram`"
          :alt="file.alt"
          :description="file.description"
          @fileSelected="fileSelected"
          @changeAltOrDescription="changeAltOrDescription"
        ></input-file>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-12 d-flex">
        <button @click="addImage" class="btn btn-warning">
          Ajouter une images
        </button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-12 d-flex">
        <button @click="saveImages" class="btn btn-primary">Enregistrer</button>
      </div>
    </div>
    <!-- exemple -->
    <div class="row mt-5">
      <h5>Elles s'afficheront sur la page d'accueil comme ceci :</h5>
      <p>
        sur les petits écrans, les dernières images seront cachées, il faudra
        scroller horizontalement pour les voir. Les images seront placées dans
        l'ordre chronologine d'enregistrement décroissant (dernière ajoutée en
        premier).
      </p>
    </div>
    <div class="container mt-4">
      <h2 class="text-center">Retrouvez Lionel sur Instagram</h2>
      <hr />
    </div>
    <div class="d-flex overflow-hidden">
      <div class="" v-for="file in files" :key="file.id">
        <div class="img-insta" :style="getImage(file.id)" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AdminInsta",
  components: {},
  data() {
    return {
      files: [],
      newId: 0,
    };
  },
  async mounted() {
    this.loadImageFiles();
  },
  methods: {
    async loadImageFiles() {
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL + "/files/instagram"
      );
      this.files = response.data;
    },
    getImage(id) {
      if (id < 1) return;
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/files/${id}/instagram')`;
    },
    addImage() {
      this.files.push({ id: this.newId });
      this.newId--;
    },
    fileSelected(file, id) {
      console.log("file", file);
      let index = this.files.findIndex((file1) => {
        return file1.id === id;
      });
      console.log("index", index);
      this.files[index].file = file;
    },
    changeAltOrDescription(id, alt, description) {
      console.log("id, alt, description", id, alt, description);
      let index = this.files.findIndex((file1) => {
        return file1.id === id;
      });
      console.log("index", index);
      this.files[index].alt = alt;
      this.files[index].description = description;
    },
    async saveImages() {
      // on envoie les files déjà existant pour suprimer ceux qui ont été modifié
      let files1 = this.files.filter((file) => {
        return file.id > 0 && !file.file;
      });
      await this.$axios.post(
        process.env.VUE_APP_SERVER_URL + "/admin/files/instagram1",
        files1
      );
      let files2 = this.files.filter((file) => {
        return !file.id || file.file;
      });
      console.log("files2", this.files, files2);
      for (let i = 0; i < files2.length; i++) {
        const file = files2[i];
        if (!file.file) return;
        console.log("file", file);
        let formData = new FormData();
        formData.append("image", file.file, file.name);
        formData.append("alt", file.alt ? file.alt : "");
        formData.append(
          "description",
          file.description ? file.description : ""
        );
        await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/admin/files/instagram2",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      this.loadImageFiles();
    },
  },
};
</script>
<style lang="scss" scoped>
.img-insta {
  width: 250px;
  height: 250px;
  background-position: center;
  background-size: cover;
}
</style>
