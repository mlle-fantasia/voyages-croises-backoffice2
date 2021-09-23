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
            v-model="tag.text"
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
            v-model="tag.value"
            type="text"
          />
        </div>
        <button @click="saveTag" class="btn btn-primary mt-2">
          Enregistrer
        </button>
        <button
          v-if="tagId"
          @click="deleteTag"
          class="btn btn-danger mt-2 ms-2"
          :disabled="tag.articles.length > 0"
        >
          Supprimer
        </button>
      </div>
    </div>
    <modal-confirm
      v-model="deleteConfirm"
      :text="`Voulez-vous supprimer ce tag : ${tag.text}  ?`"
      @canceled="deleteConfirm = false"
      @confirmed="deleteTagConfirmed"
    ></modal-confirm>
  </div>
</template>

<script>
export default {
  name: "FormTag",
  components: {},
  props: {
    tagId: [Number, String],
  },
  data() {
    return {
      tag: {},
      deleteConfirm: false,
    };
  },
  async mounted() {
    this.loadTag();
  },
  watch: {
    tagId() {
      this.loadTag();
    },
  },
  methods: {
    async loadTag() {
      if (this.tagId) {
        let response = await this.$axios.get(
          process.env.VUE_APP_SERVER_URL + "/admin/tags/" + this.tagId
        );
        this.tag = response.data;
      }
    },
    async saveTag() {
      let response;
      if (this.tagId) {
        response = await this.$axios.put(
          process.env.VUE_APP_SERVER_URL + "/admin/tags/" + this.tagId,
          this.tag
        );
      } else {
        response = await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/admin/tags/add",
          this.tag
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
          text: "Tag bien entregistrée !",
        });
      }
      this.$emit("saved");
    },

    deleteTag() {
      this.deleteConfirm = true;
    },
    async deleteTagConfirmed() {
      await this.$axios.delete(
        process.env.VUE_APP_SERVER_URL + "/admin/tags/delete/" + this.tag.id
      );
      this.deleteConfirm = false;
      this.$emit("saved");
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
