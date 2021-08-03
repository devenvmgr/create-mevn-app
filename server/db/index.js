const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb://127.0.0.1:27017/barberzen";

const db = {
  connect: async function () {
    const db = mongoose.connection;
    db.on("error", () => console.log("connection error:"));
    db.on("connected", () => {
      console.log("Mongoose connection is open");
    });
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    return mongoose.connection;
  },
};

module.exports = { db };
