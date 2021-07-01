<template>
  <div class="">
    <div class="">
      <h2>Éditez les textes de la page : {{ page.name }}</h2>
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
  },
};
</script>
<style lang="scss" scoped></style>
