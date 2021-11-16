<template>
  <div class="contact">
    <div class="container-fluid img-header-page" :style="getImage()"></div>
    <div class="container">
      <div class="row my-5">
        <div class="col-md-9">
          <h2 class="text-center">Pour nous contacter</h2>
          <hr />
          <div v-html="maintext"></div>
          <div class="form-contact mt-5">
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
            <div class="row">
              <div class="col-md-6">
                <vue-recaptcha
                  ref="invisibleRecaptcha"
                  @verify="onVerify"
                  @expired="onExpired"
                  :sitekey="google_key"
                  :loadRecaptchaScript="true"
                  theme="light"
                >
                </vue-recaptcha>
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
          <aside2
            :lastArticles="lastArticles"
            :textapropos="textapropos"
          ></aside2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "contact",
  components: { VueRecaptcha },
  data() {
    return {
      page: {},
      texts: [],
      maintext: "",
      newMessage: { message: "", email: "", name: "", object: "" },
      message_success: false,
      message_error: false,
      textapropos: "",
      lastArticles: [],
      recaptcha: false,
      google_key: process.env.VUE_APP_RECAPTCHA_KEY,
    };
  },
  async mounted() {
    // get texts de la page
    let params = {
      aside: true,
    };
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/pages/" + this.$route.name,
      { params }
    );
    this.page = response.data.page;
    this.texts = response.data.page.texts;
    let maintext = this.texts.filter((text) => {
      return text.key === "Texte principal";
    });
    if (maintext.length) this.maintext = maintext[0].text;

    this.textapropos = response.data.apropos.text;
    this.lastArticles = response.data.lastarticles;
  },
  methods: {
    getImage() {
      return `background-image:url('${process.env.VUE_APP_SERVER_URL}/pages/${this.page.id}/image')`;
    },
    onVerify: function () {
      this.recaptcha = true;
    },
    onExpired: function () {
      this.recaptcha = false;
    },
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
