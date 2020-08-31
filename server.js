const express = require("express");

const app = express();

app.use("api/users", require("./routes/users"));
app.use("api/suth", require("./routes/suth"));
app.use("api/bookings", require("./routes/bookings"));
app.use("api/trainings", require("./routes/trainings"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
