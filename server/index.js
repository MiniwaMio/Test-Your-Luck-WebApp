//packages
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

//middleware
app.use(cors());
app.use(express.json());

//Routes

//Register an account
app.post("/register", async (req, res) => {
  try {
    //{needs to match parameter}
    const { username } = req.body;
    const { password } = req.body;
    console.log(username, password);
    //encrypting password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO users (username, user_pass, score) VALUES($1,$2,0) RETURNING *",
      [username, hashedPassword]
    );
    console.log(result);
    res.json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.log("Error at registration");
  }
});

//Authenticate
app.post("/Login", async (req, res) => {
  try {
    const { uname } = req.body.username;
    const { upass } = req.body.password;
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE username = $uname AND user_pass = $upass",
      [uname, upass]
    );

    res.json(newUser);
  } catch (err) {
    console.log("Error at Login");
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
