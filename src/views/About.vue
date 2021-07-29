<template>
  <div>
    <div class="container-fluid bg-image bg-ocre">
      <div class="container" v-html="maintext">
        <!-- <h2 class="mb-3">A propos de voyages croisées</h2>
        <h3>Qui sommes-nous ?</h3>
        <p class="px-5">
          Ce blog de voyages regroupe les expériences de Lionel et Alexandre à
          travers le monde. Passionnés de voyages...
        </p> -->
      </div>
    </div>
    <div class="container-fluid bg-image bg-lio">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 bg-white" v-html="descriptionlio"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-ocre">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="col-12 col-md-6" v-html="questionslio">
            <!-- <p>
              <span class="fw-bold">Prénom :</span><br />
              Lionel <br />
              <span class="fw-bold">Age :</span> <br />56 ans <br /><br />
              <span class="fw-bold">Premier voyage :</span> <br />
              la bas en 2012 avec des potes <br />
              <br />
              <span class="fw-bold">Destination préférée :</span> <br />
              ici
              <br />
              <br />
              <span class="fw-bold">Ce que je préfère pendant un voyage :</span>
              <br />
              blablabla
            </p> -->
          </div>
          <div class="col-12 col-md-6">
            <img class="img-fluid" src="/img/lionel2.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-image bg-alex">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 bg-white" v-html="descriptionalex"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-ocre">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="col-12 col-md-6 text-center" v-html="questionslio">
            <!--  <p>
              <span class="fw-bold">Prénom :</span><br />
              Alexandre <br />
              <span class="fw-bold">Age :</span> <br />29 ans <br /><br />
              <span class="fw-bold">Premier voyage :</span> <br />
              la bas en 2012 avec des potes <br />
              <br />
              <span class="fw-bold">Destination préférée :</span> <br />
              ici <br />
              <br />
              <span class="fw-bold">Ce que je préfère pendant un voyage :</span>
              <br />
              blablabla
            </p> -->
          </div>
          <div class="col-12 col-md-6">
            <img class="img-fluid" src="/img/alexandre2.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "apropos",
  components: {},
  data() {
    return {
      page: {},
      texts: [],
      maintext: "",
      descriptionlio: "",
      questionslio: "",
      descriptionalex: "",
      questionsalex: "",
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/pages/" + this.$route.name
    );
    console.log(response);
    this.page = response.data.page;
    this.texts = response.data.page.texts;
    let maintext = this.texts.filter((text) => {
      return text.key === "Texte principal";
    });
    console.log("maintext", maintext);
    if (maintext.length) this.maintext = maintext[0].text;

    let descriptionlio = this.texts.filter((text) => {
      return text.key === "Présentation Lionel";
    });
    if (descriptionlio.length) this.descriptionlio = descriptionlio[0].text;

    let questionslio = this.texts.filter((text) => {
      return text.key === "Questions Lionel";
    });
    if (questionslio.length) this.questionslio = questionslio[0].text;
    let descriptionalex = this.texts.filter((text) => {
      return text.key === "Présentation Alexandre";
    });
    if (descriptionalex.length) this.descriptionalex = descriptionalex[0].text;

    let questionsalex = this.texts.filter((text) => {
      return text.key === "Questions Alexandre";
    });
    if (questionsalex.length) this.questionsalex = questionsalex[0].text;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.img-fluid {
  //max-width: 70%;
}
</style>
