<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'Home' ? 'active' : ''"
              to="/"
              >Accueil</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="goVoyageurs">Les Voyageurs</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Destinations
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">France</a></li>
              <li><a class="dropdown-item" href="#">Europe</a></li>
              <li><a class="dropdown-item" href="#">Afrique</a></li>
              <li><a class="dropdown-item" href="#">Asie</a></li>
              <li><a class="dropdown-item" href="#">Océanie</a></li>
              <li><a class="dropdown-item" href="#">Amérique du sud</a></li>
              <li><a class="dropdown-item" href="#">Amérique du nord</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'Contact' ? 'active' : ''"
              to="/contact"
              >Contact</router-link
            >
          </li>
        </ul>
        <!--  <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            v-model="search"
            placeholder="Recherche"
            aria-label="Search"
          />
          <button @click="goSearch" class="btn btn-outline-success">
            Search
          </button>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navPublic",
  components: {},
  data() {
    return {
      search: "",
    };
  },
  async mounted() {},
  methods: {
    goVoyageurs() {
      //this.$emit("goVoyageurs");
    },
    goSearch() {},
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #b9b9b9;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
}
.navbar-nav {
  margin: auto;
}
</style>
