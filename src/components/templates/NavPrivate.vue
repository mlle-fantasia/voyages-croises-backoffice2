<template>
  <nav
    id="nav"
    class="navbar navbar-expand-lg navbar-light bg-light align-items-start"
  >
    <div class="container-fluid d-flex flex-column text-left">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand w-100 text-center" to="/">
        <img style="width: 60px" src="/img/logo.png" alt="logo"
      /></router-link>
      <div class="collapse navbar-collapse w-100 mt-3" id="navbarTogglerDemo03">
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-column text-left"
        >
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'AdminHome' ? 'active' : ''"
              to="/admin/home"
              >Accueil</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'AdminArticles' ? 'active' : ''"
              to="/admin/articles"
              >Les articles</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'AdminCategories' ? 'active' : ''"
              to="/admin/categories"
              >Les catégories et tags</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'AdminHome' ? 'active' : ''"
              to="/admin/comments"
              >Les commentaires</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'AdminUsers' ? 'active' : ''"
              to="/admin/users"
              >Les utilisateurs</router-link
            >
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'pages' ? 'active' : ''"
              to="/admin/pages"
              >Les pages</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar-brand {
  display: none;
  border-bottom: 1px solid gray;
  padding-bottom: 15px;
}
@media (min-width: 992px) {
  .navbar {
    height: 100%;
  }
  .navbar-brand {
    display: block;
  }
}
</style>
