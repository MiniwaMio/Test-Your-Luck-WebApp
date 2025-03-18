//packages
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Routes

//Adding an attempt

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
