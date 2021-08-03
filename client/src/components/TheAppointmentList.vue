<template>
  <div>
    <div class="has-text-centered" v-if="!appointments.length">
      <h2 class="subtitle">You don't currently have any upcoming appointments.</h2>
      <!-- <div class="has-text-centered"> -->
        <router-link to="schedule" class="button is-small is-inverted is-primary ripple">
          <strong>Book Now!</strong>
        </router-link>
      <!-- </div> -->
    </div>
    <div
      class="box notification is-primary is-light"
      v-for="appointment in appointments"
      :key="appointment.title"
    >
      <p>{{appointment.title}}</p>
      <p>{{appointment.start}} to {{appointment.end}}</p>
      <button class="button is-small">
        <span class="icon is-small">
          <i class="fas fa-info-circle"></i>
        </span>
        <span>Update</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TheAppointmentList",
  data() {
    return {
      appointments: []
    };
  },
  mounted() {
    this.getAppointments();
  },
  methods: {
    async getAppointments() {
      const token = localStorage.getItem("bztoken");
      const res = await axios.get("/api/all-appointments", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.appointments = res.data;
    }
  }
};
</script>

<style>
</style>