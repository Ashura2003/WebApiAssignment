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
    const currentDate = new Date();
    const targetDate = new Date(eventDate);

    if (numberOfGuest < 0) {
      return res.json({
        sucess: false,
        message: "Number of Guest is negative",
      });
    }

    if (targetDate < currentDate) {
      return res.json({
        sucess: false,
        message: "Enter valid date",
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
