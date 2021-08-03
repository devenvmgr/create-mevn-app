<template>
  <nav
    style="outline: none;"
    @blur="toggleMenu"
    tabindex="0"
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="https://www.svgrepo.com/show/300753/barber-shop.svg"
          style="height: 30px;"
        />
        BarberZen
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      v-bind:class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              to="schedule"
              class="button is-small is-inverted is-primary ripple"
            >
              <strong>Book Now</strong>
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="this['user/authStatus']">
          <router-link to="dashboard">
            <small
              >Hi, {{ this["user/userInfo"].name.split(" ")[0] }}!</small
            >
          </router-link>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              class="button is-primary"
              to="/register"
              v-if="!this['user/authStatus']"
            >
              <strong>Sign up</strong>
            </router-link>
            <router-link
              class="button is-light"
              to="/login"
              v-if="!this['user/authStatus']"
            >
              Log in
            </router-link>
            <a class="button is-light" to="/login" @click="logout" v-else
              >Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheNavBar",
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapGetters(["user/userInfo"]),
    ...mapGetters(["user/authStatus"]),
  },
  methods: {
    toggleMenu() {
      setTimeout(() => {
        this.isActive = !this.isActive;
      }, 100);
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      await this.$router.push("/");
      this.toggleMenu();
    },
  },
};
</script>

<style>
@keyframes ripple {
  0% {
    box-shadow: 0 4px 10px rgba(65, 242, 255, 0.08),
      0 0 0 0 rgba(65, 242, 255, 0.08), 0 0 0 5px rgba(65, 242, 255, 0.08),
      0 0 0 10px rgba(65, 242, 255, 0.08);
  }
  100% {
    box-shadow: 0 4px 10px rgba(65, 242, 255, 0.08),
      0 0 0 5px rgba(65, 242, 255, 0.08), 0 0 0 10px rgba(65, 242, 255, 0.08),
      0 0 0 20px rgba(65, 242, 255, 0);
  }
}
.ripple {
  animation: ripple 0.6s linear infinite;
}
</style>
