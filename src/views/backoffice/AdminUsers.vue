<template>
  <div class="admin-articles">
    <div class="d-flex align-items-center">
      <h2>Les utilisateurs</h2>
      <button @click="addUser" class="btn btn-warning ms-5">Nouveau</button>
    </div>
    <div class="row articles-list mt-3">
      <div
        @click="editUser(user.id)"
        class="col-md-6"
        v-for="user in users"
        :key="user.id"
      >
        <div class="card-article">
          <div class="ms-2 fw-bold">
            {{ user.firstname }}
          </div>
          <div>{{ user.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "users",
  components: {},
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    let response = await this.$axios.get(
      process.env.VUE_APP_SERVER_URL + "/admin/users"
    );
    this.users = response.data;
  },
  methods: {
    editUser(id) {
      this.$router.push("/admin/users/" + id);
    },
    addUser() {
      this.$router.push("/admin/users/-1");
    },
  },
};
</script>
<style lang="scss" scoped>
.card-article {
  cursor: pointer;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #eae8e8;
  box-shadow: lightgrey 0px 1px 2px 0px;
  margin-bottom: 15px;
  padding: 5px 12px;
}
</style>
