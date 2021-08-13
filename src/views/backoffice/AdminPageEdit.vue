<template>
  <div class="">
    <div class="">
      <h2>Éditez la page : {{ page.name }}</h2>
      <h3>La page</h3>
    </div>
    <div class="">
      <form-page :pageId="$route.params.id"></form-page>
    </div>
    <div class="d-flex align-items-center mt-3">
      <h3>Les textes</h3>
    </div>

    <div v-for="text in texts" :key="text.key">
      <div class="mb-3">
        <input
          class="form-control"
          :name="'key' + text.key"
          :id="'key' + text.key"
          v-model="text.key"
          type="text"
          disabled
        />
      </div>
      <div class="mb-3">
        <jodit-editor
          :name="'text' + text.key"
          :id="'text' + text.key"
          v-model="text.text"
          :buttons="buttons"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <button @click="saveTextes" class="btn btn-success">Enregistrer</button>
        <button
          v-if="$store.state.user.type === 'superadmin'"
          @click="formAddText"
          class="btn btn-primary ms-2"
        >
          Ajouter un texte
        </button>
      </div>
    </div>
    <div v-if="showFormAddText" class="form-addtext mt-3">
      <div class="mb-3">
        <label class="form-label" for="keyNewText">clé *</label>
        <br />
        <input
          class="form-control"
          name="keyNewText"
          id="keyNewText"
          v-model="newText.key"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="textNewText">Contenu du text</label>
        <jodit-editor
          name="textNewText"
          id="textNewText"
          v-model="newText.text"
          :buttons="buttons"
        />
      </div>
      <div class="d-flex">
        <button @click="cancelNewText" class="btn btn-secondary btn-sm">
          Annuler
        </button>
        <button @click="saveNewText" class="btn btn-primary ms-2 btn-sm">
          Ajouter texte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPageEdit",
  components: {},
  props: {},
  data() {
    return {
      page: {},
      texts: [],
      newText: { key: "", contenu: "" },
      showFormAddText: false,
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
    this.loadPageWithText();
  },
  watch: {},
  methods: {
    async loadPageWithText() {
      let response = await this.$axios.get(
        process.env.VUE_APP_SERVER_URL + "/admin/pages/" + this.$route.params.id
      );

      this.page = response.data;
      this.texts = this.page.texts;
    },
    formAddText() {
      this.showFormAddText = true;
    },
    cancelNewText() {
      this.showFormAddText = false;
      this.newText = { key: "", contenu: "" };
    },
    async saveNewText() {
      this.newText.pagesId = this.page.id;
      let response = await this.$axios.post(
        process.env.VUE_APP_SERVER_URL + "/admin/texts/add",
        this.newText
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
          text: "Text bien entregistré !",
        });
      }
      this.showFormAddText = false;
      this.newText = { key: "", contenu: "" };
      this.loadPageWithText();
    },
    async saveTextes() {
      let response = await this.$axios.put(
        process.env.VUE_APP_SERVER_URL + "/admin/texts/edit",
        this.texts
      );
      console.log("response", response);
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
          text: "Textes bien entregistrés !",
        });
      }
      this.loadPageWithText();
    },
  },
};
</script>
<style lang="scss" scoped>
.form-addtext {
  margin-top: 20px;
  padding: 20px 50px;
  background-color: #e9eef9;
  border-radius: 10px;
}
</style>
