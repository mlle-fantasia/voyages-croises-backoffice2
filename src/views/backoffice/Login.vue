<template>
  <div class="login d-flex align-items-center justify-content-center">
    <div class="form" style="width: 20%">
      <h3 class="text-center">Se connecter</h3>
      <div class="d-flex flex-column mt-4">
        <div class="container-login card p-3">
          <div class="mb-3">
            <label class="form-label" for="login">login</label>
            <br />
            <input
              class="form-control"
              name="login"
              id="login"
              v-model="login"
              type="text"
            />
          </div>
          <div>
            <label class="form-label" for="pass">mot de passe</label>
            <br />
            <input
              class="form-control"
              name="pass"
              id="pass"
              v-model="password"
              type="password"
            />
          </div>
          <div class="mt-2">
            <button class="btn btn-primary" @click="goLogin">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  components: {},
  data() {
    return {
      login: "marinafront@hotmail.fr",
      password: "pass123",
    };
  },
  async mounted() {},
  methods: {
    async goLogin() {
      if (!this.login || !this.password) return;
      let body = { login: this.login, pass: this.password };
      let response = await this.$axios.post(
        process.env.VUE_APP_SERVER_URL + "/login",
        body
      );
      console.log(response);
      this.$store.commit("set_connexion", {
        accesstoken: response.data.token,
        user: response.data.user,
      });
      this.$router.push("/admin/home");
      console.log("token après login", this.$store.state.accesstoken);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-image: url("/img/loginfond.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.container-login {
  background-color: #ffffff94;
}
</style>
