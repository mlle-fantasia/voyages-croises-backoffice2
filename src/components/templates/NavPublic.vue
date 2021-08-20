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
            <router-link
              class="nav-link"
              :class="$route.name === 'About' ? 'active' : ''"
              to="/apropos"
              >A propos</router-link
            >
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
              Catégories
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-for="cat in categories" :key="cat.id">
                <div class="dropdown-item" @click="goSearch(cat.value)">
                  {{ cat.text }}
                </div>
              </li>
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
      categories: [],
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/categories"
    );
    this.categories = response.data;
  },
  methods: {
    goVoyageurs() {
      //this.$emit("goVoyageurs");
    },
    goSearch(cat) {
      this.$router.push("/articles/categories/" + cat);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #b9b9b9;
  width: 100%;
  /*   position: fixed; */
  display: flex;
  justify-content: center;
  background-color: #fff;
  z-index: 1000;
}
.navbar-nav {
  margin: auto;
}
</style>
