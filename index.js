const express = require("express");
const {default: mongoose} = require("mongoose");
const {errorHandler} = require("./middleware/errorMiddleware");
// const {default: routes} = require("./routes/userRouter");
// const {default: routes} = require("./routes/appointmentRouter");

const {default: userRoutes} = require("./routes/userRouter");
const {default: AppointmentRoutes} = require("./routes/appointmentRouter");
const {logError, returnError} = require("./middleware/errorHandlerMiddleware");

const {ServerApiVersion} = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const {protect} = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT;
const db = require("./helpers/uri");

app.use(errorHandler);
app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    // origin: "*",
  })
);
mongoose.set("bufferCommands", false);

mongoose.connect(
  db.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
  () => {
    // console.log(`conectado, uri => ${db.uri}`);
    console.log("conectado 👏");
  }
);

app.use("/appointments", require("./routes/appointmentRouter"));
app.use("/users", require("./routes/userRouter"));

// AppointmentRoutes(app);
// userRoutes(app);
app.use(logError);
app.use(returnError);
app.get("/", (req, res) => res.send(`Benis ${PORT}`));

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
// app.listen(PORT, () => console.log(` ${PORT}!`));
