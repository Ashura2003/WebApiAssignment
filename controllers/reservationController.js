const Reservation = require("../models/reservationModel");

const createReservation = async (req, res) => {
  const { userId, eventDate, numberOfGuest } = req.body;

  if (!userId || !eventDate || !numberOfGuest) {
    return res.json({
      sucesss: false,
      message: "Please Enter all fields",
    });
  }

  try {
    const currentDate = Date();
    if (numberOfGuest < 0 && eventDate < currentDate) {
      return res.json({
        sucess: false,
        message: "Please enter the correct criteria",
      });
    }

    const newReservation = new Reservation({
      userId: userId,
      eventDate: eventDate,
      numberOfGuest: numberOfGuest,
    });

    await newReservation.save();

    res.json({
      userId: userId,
      eventDate: eventDate,
      numberOfGuest: numberOfGuest,
      message: "Reservation Saved",
    });
  } catch (error) {
    console.log(error);
    res.json({
      sucesss: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createReservation };
