<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div><router-link to="/">Mentions légales</router-link></div>
          <div><router-link to="/about">Plan du site</router-link></div>
          <div><router-link to="/admin">Backoffice</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  background-color: #4b4542;
  padding: 30px;
  a {
    color: #d9d8d8;
  }
}
</style>
