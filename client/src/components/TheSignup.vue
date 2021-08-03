<template>
  <div>
    <progress class="progress is-small is-primary" v-if="loading" />
    <div class="notification is-success has-text-centered" v-if="success">
      <p><strong>Success!</strong> {{ success }}</p>
    </div>
    <div class="notification is-danger has-text-centered" v-if="errors.length">
      <p><strong>Oops!</strong> Something went wrong.</p>
      <small v-for="(error, index) in errors" :key="index"
        >{{ error }}
        <span v-if="index < errors.length - 1">&middot; </span></small
      >
    </div>
    <div class="box">
      <form class="signup" @submit="onSubmit">
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
                    Sign up
                  </h1>
                  <h2 class="subtitle">
                    Register now to begin booking appointments.
                  </h2>
                </div>
              </div>
            </section>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="text"
                placeholder="Name"
                v-model="name"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user-circle"></i>
              </span>
            </p>
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
              <button class="button is-primary is-fullwidth">
                Register
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSignup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: [],
      success: "",
      loading: false,
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try {
        this.loading = true;
        const res = await this.$store.dispatch("user/signup", newUser);
        this.success = res;
        setTimeout(() => {
          this.$router.push("dashboard");
        }, 2000);
      } catch (e) {
        this.loading = false;
        const { errors } = e.message;
        if (!errors) return (this.errors = ["Do you already have an account?"]);
        Object.keys(errors).forEach((error) =>
          this.errors.push(
            `${
              errors[error].path.charAt(0).toUpperCase() +
              errors[error].path.slice(1)
            } is ${errors[error].kind.substring(0, errors[error].kind.length)}`
          )
        );
      }
    },
  },
};
</script>

<style>
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
