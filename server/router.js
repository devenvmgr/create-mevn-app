const express = require("express"); // Express backend framework
const morgan = require("morgan"); // Morgan for debugging logs
const cors = require("cors"); // Enables CORS for local API development
const bodyParser = require("body-parser"); // JSON utility
const { db } = require("./db"); // Database connection
const { User, Appointment, Barber } = require("./models"); // Models
const { auth } = require("./middleware"); // Auth middleware
const {
  user: { signup, login, logout },
} = require("./controllers");

class Routing {
  constructor(app) {
    this.app = app;
  }

  configure() {
    const { app } = this;
    app.use(cors());
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(bodyParser.text({ type: "text/*" }));
    app.disable("x-powered-by");
    app.use(express.static(`${__dirname}/public/`));
    db.connect();
  }

  init() {
    const { app } = this;

    app.post("/api/signup", signup);
    app.post("/api/login", login);
    app.get("/api/logout", auth, logout);
    app.get("/api/verify", auth, (req, res) =>
      console.log("Verifying credentials.")
    );

    app.post("/api/new-appointment", auth, async (req, res) => {
      const appointment = await Appointment.findByIdAndUpdate(req.body._id, {
        available: false,
        customerID: req.user._id,
      }).exec();
    });

    app.get("/api/available-appointments/:barber", async (req, res) => {
      console.log(`Getting available appointments for ${req.params.barber}`);
      const { _id: barberID } = await Barber.findOne({
        name: req.params.barber,
      });
      const appointments = await Appointment.find({
        barberID,
        available: true,
      });
      res.json(appointments);
    });

    app.get("/api/all-appointments", async (req, res) => {
      require("jsonwebtoken").verify(
        req.headers.authorization.split(" ")[1],
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
          const appointments = await Appointment.find({
            customerID: decoded._id,
          });
          res.json(appointments);
        }
      );
    });

    app.put("/api/update-appointment", async (req, res) => {
      console.log("Updating appointment...");
    });

    app.delete("/api/cancel-appointment", async (req, res) => {
      console.log("Canceling appointment...");
    });

    /* In production, serve assets from the build folder. */
    app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
  }
}

module.exports = async ({ app }) => {
  const routing = new Routing(app);
  routing.configure();
  routing.init();
};
