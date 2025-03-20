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

    //encrypting password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO users (username, user_pass, score) VALUES($1,$2,0) RETURNING *",
      [username, hashedPassword]
    );

    res.json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.log("Error at registration");
  }
});

//Authenticate
app.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.user_pass);

    if (!isValid) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    res.status(500).json({
      message: "Login successful",
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    console.log("Error at Login");
  }
});

//Update Score



app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
