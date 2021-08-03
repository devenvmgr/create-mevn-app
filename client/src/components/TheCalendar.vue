<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column" v-bind:class="{ confirmedEvent: 'is-two-thirds'}">
          <div class="box">
            <div class="field">
              <div class="control is-expanded">
                <div class="select is-rounded is-primary is-fullwidth">
                  <select v-model="hairdresser" @change="onSelect($event)">
                    <option disabled value>Select a barber...</option>
                    <option>Barber A</option>
                    <option>Barber B</option>
                  </select>
                </div>
              </div>
            </div>
            <vue-cal
              ref="vuecal"
              style="height: 60vh;"
              :time-from="7 * 60"
              :time-to="23 * 60"
              :disable-views="['years', 'year', 'month']"
              :events="events"
              :twelve-hour="true"
              :cell-click-hold="false"
              v-bind:snap-to-time="5"
              :on-event-click="onEventClick"
            />
          </div>
        </div>
        <div class="column" v-if="confirmedEvent">
          <div class="notification is-info is-light">
            <button class="delete" aria-label="delete" @click="dropSelected"></button>
            <h2 class="subtitle">Your appointment details</h2>
            <p>Who: {{ selectedBarber }}</p>
            <p>When: {{ selectedEvent.start }} to {{ selectedEvent.end }}</p>
            <p>Where: At our downtown location</p>
          </div>
          <button
            class="button is-primary is-loading"
            v-if="success"
          >Finish scheduling my appointment</button>
          <button
            class="button is-primary"
            @click="scheduleHaircut"
            v-else
          >Finish scheduling my appointment</button>
        </div>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': active }" v-if="selectedEvent">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirm your appointment</p>
          <button class="delete" aria-label="close" @click="modalClose"></button>
        </header>
        <section class="modal-card-body">
          <p>Who: {{ selectedBarber }}</p>
          <p>When: {{ selectedEvent.start }} to {{ selectedEvent.end }}</p>
          <p>Where: At our downtown location</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="onConfirm">I'll take it!</button>
          <button class="button" @click="modalClose">Nevermind.</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import VueCal from "vue-cal";
import "vue-cal/dist/drag-and-drop.js";
import "vue-cal/dist/vuecal.css";
import AppointmentService from "../services/AppointmentService";

export default {
  name: "TheCalendar",
  components: { VueCal },
  data() {
    return {
      active: false,
      selectedBarber: "",
      selectedEvent: undefined,
      confirmedEvent: undefined,
      events: [],
      username: "",
      success: false,
      hairdresser: ""
    };
  },
  computed: {
    ...mapGetters(["user/userInfo"])
  },
  created() {
    this.username = this["user/userInfo"].name;
  },
  methods: {
    modalClose() {
      this.active = false;
    },
    onConfirm() {
      this.confirmedEvent = this.selectedEvent;
      this.modalClose();
    },
    onChange({ event }) {
      this.events.push(event);
    },
    async onSelect(e) {
      const res = await axios.get(
        `/api/available-appointments/${e.target.value}`
      );
      this.events = res.data.map(({ title, start, end, _id }) => ({
        title,
        start,
        end,
        _id,
        class: "appointment"
      }));
      this.selectedBarber = e.target.value;
    },
    onEventClick(event) {
      this.selectedEvent = event;
      this.active = true;
    },
    closeModal() {
      this.active = false;
    },
    dropSelected() {
      this.confirmedEvent = undefined;
    },
    async scheduleHaircut() {
      const { _id } = this.confirmedEvent;
      AppointmentService.create(_id);
      this.success = true;
      setTimeout(() => {
        this.$router.push("dashboard");
      }, 2000);
    }
  }
};
</script>

<style>
.vuecal__event.appointment {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
  font-size: small;
}
</style>
