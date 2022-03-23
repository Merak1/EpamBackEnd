const express = require("express");
const {default: mongoose} = require("mongoose");
const {default: routes} = require("./routes/userRouter");
const {ServerApiVersion} = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const {errorHandler} = require("./middleware/errorMiddleware");
const {protect} = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT;
const db = require("./helpers/uri");

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

routes(app);
// app.use("/users", require("./routes/userRouter"));

app.use(errorHandler);
app.get("/", (req, res) => res.send(`Benis ${PORT}`));

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
// app.listen(PORT, () => console.log(` ${PORT}!`));
