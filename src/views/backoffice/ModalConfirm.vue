<template>
  <div
    v-if="value"
    :style="
      value ? 'display:block;background-color:#3333337a;' : 'display:none;'
    "
    class="modal fade"
    :class="value ? 'show' : ''"
    id="exampleModal"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ title ? title : "Confirmation" }}
          </h5>
        </div>
        <div class="modal-body">
          {{ text }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="cancel"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Annuler
          </button>
          <button type="button" @click="confirm" class="btn btn-primary">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirm",
  components: {},
  props: {
    value: Boolean,
    title: String,
    text: String,
  },
  data() {
    return {};
  },
  async mounted() {},
  watch: {},
  methods: {
    cancel() {
      this.$emit("canceled");
    },
    confirm() {
      this.$emit("confirmed");
    },
  },
};
</script>
<style lang="scss" scoped></style>
