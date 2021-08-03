<template>
  <div id="signup-form">
    <TheSignup />
  </div>
</template>

<script>
import TheSignup from "../components/TheSignup";
export default {
  name: "Signup",
  components: {
    TheSignup,
  },
};
</script>

<style>
#signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
