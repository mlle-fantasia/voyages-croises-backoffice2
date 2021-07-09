<template>
  <!-- ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION -->
  <div class="admin-articles">
    <div class="d-flex flex-column">
      <h2>Edition d'un utilisateur</h2>
      <h4>{{ user.firstname }}</h4>
    </div>
    <div class="row article-formulaire mt-3">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label" for="title">Prénom</label>
              <br />
              <input
                class="form-control"
                name="firstname"
                id="firstname"
                v-model="user.firstname"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="title">Date de naissance</label>
              <br />
              <input
                class="form-control"
                name="birthday"
                id="birthday"
                v-model="user.birthday"
                type="date"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label" for="title">Email</label>
              <br />
              <input
                class="form-control"
                name="email"
                id="email"
                v-model="user.email"
                type="text"
              />
            </div>
            <div class="mb-3">
              <button class="btn btn-primary" @click="showFormPassword">
                Modifier le mot de passe
              </button>
            </div>
            <div v-if="formPassword">
              <div class="mb-3">
                <label class="form-label" for="title"
                  >Nouveau mot de passe</label
                >
                <br />
                <input
                  class="form-control"
                  name="password1"
                  id="password1"
                  v-model="password1"
                  type="password"
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="title"
                  >Répétez le mot de passe</label
                >
                <br />
                <input
                  class="form-control"
                  name="password2"
                  id="password2"
                  v-model="password2"
                  type="password"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <button @click="saveUser" class="btn btn-primary">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminUsersEdit",
  components: {},
  data() {
    return {
      user: {},
      password1: "",
      password2: "",
      formPassword: false,
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/admin/users/" + this.$route.params.id
    );
    console.log(response);
    this.user = response.data.user;
  },
  watch: {},
  methods: {
    showFormPassword() {
      this.formPassword = !this.formPassword;
      if (!this.formPassword) {
        this.password1 = "";
        this.password2 = "";
      }
    },
    async saveUser() {
      if (this.formPassword) {
        console.log(
          "pass",
          this.password1,
          this.password2,
          this.password1 === this.password2
        );
        if (
          this.password1 &&
          this.password2 &&
          this.password1 === this.password2
        )
          this.user.password = this.password1;
        else {
          this.$notify({
            group: "message",
            type: "error",
            title: "Erreur",
            text: "Erreur dans le mot de passe ",
          });
          return;
        }
      }
      let response;
      if (this.user.id) {
        response = await this.$axios.put(
          process.env.VUE_APP_SERVER_URL + "/admin/users/" + this.user.id,
          this.user
        );
      } else {
        response = await this.$axios.post(
          process.env.VUE_APP_SERVER_URL + "/admin/users/add",
          this.user
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
          text: "user bien entregistré!",
        });
      }
      this.$router.push("/admin/users");
    },
  },
};
</script>
<style lang="scss" scoped></style>
