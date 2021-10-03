<template>
  <div>
    <div class="mb-2">
      <label class="form-label" for="inputMainImage">{{ label }}</label>
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
    <div v-if="mainImage.binary || this.id > 0">
      <div
        class="mb-3 main-image"
        :class="'image-' + classImage"
        :style="getImage()"
      ></div>
      <div>
        <label class="form-label mb-0" for="valuecat">Text alternatif</label>
        <br />
        <input
          class="form-control"
          name="alt"
          id="alt"
          v-model="textAlt"
          type="text"
          @input="changeAltOrDescription"
        />
      </div>
      <div>
        <label class="form-label mb-0" for="valuecat">Description</label>
        <br />
        <textarea
          class="form-control"
          name="description"
          id="description"
          v-model="textDescription"
          @input="changeAltOrDescription"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminInsta",
  components: {},
  props: {
    routeImage: String,
    id: Number,
    classImage: String,
    label: String,
    alt: String,
    description: String,
  },
  data() {
    return {
      mainImage: { image: null, binary: null },
      textAlt: this.alt ? this.alt : "",
      textDescription: this.description ? this.description : "",
      tsInput: null,
    };
  },
  async mounted() {},
  methods: {
    getImage() {
      if (this.mainImage.binary)
        return "background-image:url(" + this.mainImage.binary + ")";
      else if (this.id && this.id > 0)
        return `background-image:url('${process.env.VUE_APP_SERVER_URL}${this.routeImage}')`;
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

      this.$emit("fileSelected", this.mainImage.image, this.id);
    },
    changeAltOrDescription() {
      if (this.tsInput) window.clearTimeout(this.tsInput);
      this.tsInput = window.setTimeout(() => {
        this.$emit(
          "changeAltOrDescription",
          this.id,
          this.textAlt,
          this.textDescription
        );
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.image-instagram {
  height: 200px;
  width: 200px;
  background-position: center;
  background-size: cover;
}
</style>
