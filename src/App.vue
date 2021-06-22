<template>
  <div id="app">
    <div v-if="!$store.state.connected && $route.name !== 'Login'">
      <nav-public class="nav-bublic" ref="navPublic"></nav-public>
      <router-view />
      <footer-public></footer-public>
    </div>
    <div v-if="$store.state.connected && $route.name !== 'Login'">
      <div class="row container-private">
        <div class="col-md-2 pe-0 pe-md-2">
          <nav-private></nav-private>
        </div>
        <div class="col-md-10 p-2 p-md-5">
          <div class="container">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <div v-if="$route.name === 'Login'">
      <router-view />
    </div>
    <notifications group="message" position="top center" />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  async mounted() {
    window.addEventListener("scroll", function () {
      this.$refs.navPublic.$el.classList.value =
        this.$refs.navPublic.$el.classList.value + " bg-white";
    });
  },
  methods: {},
};
</script>

<style lang="scss">
@import "./scss/styles.scss";
@media (min-width: 992px) {
  .container-private {
    height: 100vh;
  }
  .nav-bublic {
    transition: all 1s ease;
  }
  .bg-white {
    background-color: #fff;
  }
}
</style>
