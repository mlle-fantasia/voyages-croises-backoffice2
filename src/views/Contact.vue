<template>
  <div class="contact">
    <div class="container-fluid img-accueil"></div>
    <div class="container">
      <div class="row my-5">
        <div class="col-md-9">
          <h2 class="text-center">Pour nous contacter</h2>
          <hr />
          <div v-html="maintext"></div>
          <div class="form-contact">
            <div class="mb-3">
              <label class="form-label" for="title">Objet</label>
              <br />
              <input
                class="form-control"
                name="title"
                id="title"
                v-model="newMessage.object"
                type="text"
              />
            </div>
            <div>
              <label for="newMessage">Message *</label>
              <textarea
                class="form-control mb-3"
                name="newMessage"
                id="newMessage"
                v-model="newMessage.message"
                type="textarea"
                rows="6"
              >
              </textarea>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="name"
                    >Votre nom complet *</label
                  >
                  <br />
                  <input
                    class="form-control"
                    name="name"
                    id="name"
                    v-model="newMessage.name"
                    type="text"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="email"
                    >Votre adresse email *</label
                  >
                  <br />
                  <input
                    class="form-control"
                    name="email"
                    id="email"
                    v-model="newMessage.email"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div class="alert alert-success" v-if="message_success">
              Votre message à bien été envoyé.
            </div>
            <div class="alert alert-danger" v-if="message_error">
              Attention, un des champs obligatoire est manquant
            </div>
            <button @click="sendMessage" class="btn btn-primary">
              Envoyer
            </button>
          </div>
        </div>
        <div class="col-md-3">
          <h5 class="text-center mb-0">A propos</h5>
          <hr />
          <router-link
            class="nav-link"
            :class="$route.name === 'About' ? 'active' : ''"
            to="/apropos"
          >
            <img class="img-fluid" src="/img/propos.jpg" alt="" />
          </router-link>
          <p class="text-center">
            Lionel et Alexandre, père et fils, sont passionnés de voyages et de
            découvertes, ils partagent avec vous leur expérience
          </p>
          <h5 class="mt-4 text-center mb-0">Derniers articles</h5>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "contact",
  components: {},
  data() {
    return {
      texts: [],
      maintext: "",
      newMessage: { message: "", email: "", name: "", object: "" },
      message_success: false,
      message_error: false,
    };
  },
  async mounted() {
    // get texts de la page
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/pages/" + this.$route.name
    );
    this.texts = response.data.texts;
    let maintext = this.texts.filter((text) => {
      return text.key === "Texte principal";
    });
    if (maintext.length) this.maintext = maintext[0].text;
  },
  methods: {
    async sendMessage() {
      this.message_error = false;
      this.message_success = false;
      if (
        !this.newMessage.message ||
        !this.newMessage.name ||
        !this.newMessage.email
      )
        this.message_error = true;
      else {
        let response = await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/newmessage",
          this.newMessage
        );
        console.log(response);
      }
    },
  },
};
</script>
