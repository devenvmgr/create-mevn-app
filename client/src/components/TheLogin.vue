<template>
  <div>
    <div class="notification is-success has-text-centered" v-if="success">
      <p><strong>Success!</strong> {{ success }}</p>
    </div>
    <div class="notification is-danger has-text-centered" v-if="errors.length">
      <p><strong>Oops!</strong> Something went wrong.</p>
      <small v-for="(error, index) in errors" :key="index">
        {{ error }}
        <span v-if="index < errors.length - 1">&middot; </span></small
      >
    </div>
    <progress class="progress is-small is-primary" v-if="loading" />
    <div class="box">
      <form class="signup" @submit="login">
        <div>
          <div class="level-left">
            <div class="level-item">
              <img
                src="https://www.svgrepo.com/show/300753/barber-shop.svg"
                style="height: 30px;"
              />
            </div>
            <section class="hero">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">
                    Log in
                  </h1>
                  <h2 class="subtitle">
                    Manage appointments from your BarberZen dashboard.
                  </h2>
                </div>
              </div>
            </section>
          </div>

          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="Email"
                v-model="email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-light is-success is-fullwidth">
                Login
              </button>
            </p>
          </div>
          <p class="has-text-centered">
            <small
              >Don't have an account?
              <router-link to="register">Sign up!</router-link></small
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLogin",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      success: "",
      loading: false,
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const creds = {
        email: this.email,
        password: this.password,
      };
      try {
        this.loading = true;
        const res = await this.$store.dispatch("user/login", creds);
        this.success = res;
        setTimeout(() => {
          this.$router.push("dashboard");
        }, 2000);
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.errors = [e.message];
      }
    },
  },
};
</script>

<style>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
