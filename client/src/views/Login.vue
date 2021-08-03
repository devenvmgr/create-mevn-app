<template>
  <div id="login-form">
    <TheLogin />
  </div>
</template>

<script>
import TheLogin from "../components/TheLogin";
export default {
  name: "Login",
  components: {
    TheLogin,
  },
};
</script>

<style>
#login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
