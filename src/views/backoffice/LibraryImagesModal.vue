<template>
  <div
    class="modal"
    v-if="value"
    :style="
      value ? 'display:block;background-color:#3333337a;' : 'display:none;'
    "
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Bibliothèque d'images</h2>
          <p>Choisissez une image à insérer dans l'article</p>
        </div>
        <div class="modal-body">
          <library-images
            @imageSelected="imageSelectedInLibrary"
            @imagesMultipleSelected="imagesMultipleSelectedInLirary"
            :multiple="templateSeleted === 'one' ? false : true"
          ></library-images>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cancelImage">
            Annuler
          </button>
          <button class="btn btn-primary" @click="choiceImage">Choisir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalLibraryImages",
  props: {
    value: Boolean,
    templateSeleted: String,
  },

  data() {
    return {
      dialog: false,
      windowWidth: window.innerWidth,
      imageSelectedId: 0,
      imagesSelected: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  watch: {
    value: function (val) {
      this.dialog = val;
      // if (!this.width) this.width = "500px";
    },
  },
  components: {},
  methods: {
    onResize() {
      console.log("window.innerWidth", window.innerWidth);
      this.windowWidth = window.innerWidth;
    },
    imageSelectedInLibrary(id) {
      this.imageSelectedId = id;
    },
    imagesMultipleSelectedInLirary(tabImage) {
      this.imagesSelected = tabImage;
    },
    choiceImage() {
      this.dialog = false;
      this.$emit("input", false);
      let dataToReturn = this.imageSelectedId;
      if (this.templateSeleted !== "one") dataToReturn = this.imagesSelected;
      this.$emit("imageSelected", dataToReturn);
    },
    cancelImage() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="scss">
.modal-dialog {
  margin: auto;
  max-width: 100%;
}
@media (min-width: 992px) {
  .modal-dialog {
    max-width: 80%;
  }
}
</style>
