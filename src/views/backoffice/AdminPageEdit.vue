<template>
  <div class="">
    <div class="">
      <h2>Éditez les textes de la page : {{ page.name }}</h2>
    </div>
    <div>
      <button @click="formAddText" class="btn btn-primary">
        Ajouter un texte
      </button>
    </div>
    <div v-if="showFormAddText">
      <div class="mb-3">
        <label class="form-label" for="title">clé *</label>
        <br />
        <input
          class="form-control"
          name="keyText"
          id="keyText"
          v-model="newText.key"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="contenu">Contenu du text</label>
        <jodit-editor
          name="contenu"
          id="contenu"
          v-model="newText.contenu"
          :buttons="buttons"
          :insertImageAsBase64URI="true"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <button @click="save" class="btn btn-primary">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPageEdit",
  components: {},
  data() {
    return {
      page: {},
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
    console.log("je passe ");
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/admin/pages/" + this.$route.params.id
    );
    console.log(response);
    this.page = response.data.page;
  },
  watch: {},
  methods: {
    save() {},
    formAddText() {
      this.showFormAddText = true;
    },
  },
};
</script>
<style lang="scss" scoped></style>
