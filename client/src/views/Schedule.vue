<template>
  <div>
    <section class="section">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Book an appointment
            </h1>
            <h2 class="subtitle">
              We're flexible.
            </h2>
          </div>
        </div>
      </section>
      <TheCalendar />
    </section>
  </div>
</template>

<script>
import TheCalendar from "../components/TheCalendar";

export default {
  name: "Schedule",
  components: { TheCalendar },
};
</script>

<style>

</style>
