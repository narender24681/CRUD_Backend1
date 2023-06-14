const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port;
const { dbConnection } = require("./db");
const { userRouter } = require("./routes/User.route");
const { noteRouter } = require("./routes/Note.route");
const { auth } = require("./middlewares/auth.middleware");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes", auth, noteRouter);

app.listen(port, async () => {
  try {
    await dbConnection;
    console.log("Connected to the Database");
  }
  catch (err) {
    console.log(err);
    console.log("Cannot connect to the Database");
  }

  console.log(`Server is running on the port: ${port}`);
});