const { ObjectId } = require("mongoose").Types;
const { Barber, Appointment } = require("../models");
const { db } = require("./index"); // Database connection

async function getBarbers() {
  const connection = await db.connect();
  try {
    return await connection.db.collection("barbers").find({}).toArray();
  } catch (e) {
    console.log(e);
  }
}

async function createBarbers() {
  const barbers = [
    new Barber({ name: "Barber A" }),
    new Barber({ name: "Barber B" }),
  ];
  barbers.forEach((barber) => barber.save());
}

async function createSchedules(timePeriod = 7) {
  const barbers = await getBarbers();
  const appointmentsA = [];
  const appointmentsB = [];
  const start = new Date();
  const end = new Date().setDate(start.getDate() + timePeriod);
  let current;
  while (start < end) {
    current = new Date(start.setDate(start.getDate() + 1));
    // BARBER A
    appointmentsA.push(
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[0]._id),
        title: `Haircut with ${barbers[0].name}`,
        start: `${current.toISOString().split("T")[0]} 7:00`,
        end: `${current.toISOString().split("T")[0]} 8:00`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[0]._id),
        title: `Haircut with ${barbers[0].name}`,
        start: `${current.toISOString().split("T")[0]} 8:30`,
        end: `${current.toISOString().split("T")[0]} 9:30`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[0]._id),
        title: `Haircut with ${barbers[0].name}`,
        start: `${current.toISOString().split("T")[0]} 10:00`,
        end: `${current.toISOString().split("T")[0]} 11:00`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[0]._id),
        title: `Haircut with ${barbers[0].name}`,
        start: `${current.toISOString().split("T")[0]} 11:30`,
        end: `${current.toISOString().split("T")[0]} 12:30`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[0]._id),
        title: `Haircut with ${barbers[0].name}`,
        start: `${current.toISOString().split("T")[0]} 13:30`,
        end: `${current.toISOString().split("T")[0]} 14:30`,
      })
    );

    // BARBER B
    appointmentsB.push(
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[1]._id),
        title: `Haircut with ${barbers[1].name}`,
        start: `${current.toISOString().split("T")[0]} 10:00`,
        end: `${current.toISOString().split("T")[0]} 11:00`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[1]._id),
        title: `Haircut with ${barbers[1].name}`,
        start: `${current.toISOString().split("T")[0]} 11:30`,
        end: `${current.toISOString().split("T")[0]} 12:30`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[1]._id),
        title: `Haircut with ${barbers[1].name}`,
        start: `${current.toISOString().split("T")[0]} 13:00`,
        end: `${current.toISOString().split("T")[0]} 14:00`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[1]._id),
        title: `Haircut with ${barbers[1].name}`,
        start: `${current.toISOString().split("T")[0]} 14:30`,
        end: `${current.toISOString().split("T")[0]} 15:30`,
      }),
      new Appointment({
        available: true,
        barberID: ObjectId(barbers[1]._id),
        title: `Haircut with ${barbers[1].name}`,
        start: `${current.toISOString().split("T")[0]} 16:00`,
        end: `${current.toISOString().split("T")[0]} 17:00`,
      })
    );
  }
  appointmentsA.forEach((appointment) => {
    Barber.findByIdAndUpdate(appointment.barberID, {
      $push: { appointments: appointment._id },
    }).exec();
    appointment.save();
  });
  appointmentsB.forEach((appointment) => {
    Barber.findByIdAndUpdate(appointment.barberID, {
      $push: { appointments: appointment._id },
    }).exec();
    appointment.save();
  });
  console.log("Successfully generated barber schedules");
}

async function bootstrap() {
  await createBarbers();
  await createSchedules();
  setTimeout(process.exit, 250);
}

bootstrap();
