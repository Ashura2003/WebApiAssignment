const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");

app.use("/api/", require("./routes/userRoutes"));


dotenv.config();

connectDatabase();

const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/", require("./routes/reservationRoute"));
app.use("/api/", require("./routes/bookAppointmentRoute"));

app.listen(PORT, () => {
  console.log(`The server is successfully running on  ${PORT}`);
});
