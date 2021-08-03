<template>
  <div class="content">
    <div class="container">
      <TheAppointmentList />
    </div>
  </div>
</template>

<script>
import TheAppointmentList from "../components/TheAppointmentList";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    TheAppointmentList
  },
  computed: {
    ...mapGetters(["user/userInfo"])
  }
};
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
