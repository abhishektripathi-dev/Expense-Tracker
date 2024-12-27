// Backend: Express.js server
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // For serving the HTML frontend

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/signupDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// Routes
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("User registered successfully!");
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("Email already exists.");
    } else {
      res.status(500).send("Error registering user: " + error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Frontend: public/index.html
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f2f5;
    }
    .signup-container {
      background: #fff;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }
    .signup-container h2 {
      margin-bottom: 20px;
      text-align: center;
      color: #333;
    }
    .signup-container input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .signup-container button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    .signup-container button:hover {
      background-color: #0056b3;
    }
    .signup-container .login-link {
      margin-top: 15px;
      text-align: center;
    }
    .signup-container .login-link a {
      color: #007bff;
      text-decoration: none;
    }
    .signup-container .login-link a:hover {
      text-decoration: underline;
    }
    @media (max-width: 768px) {
      .signup-container {
        padding: 15px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="signup-container">
    <h2>Create an Account</h2>
    <form id="signupForm">
      <input type="text" id="name" name="name" placeholder="Name" required>
      <input type="email" id="email" name="email" placeholder="Email" required>
      <input type="password" id="password" name="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
      <div class="login-link">
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </form>
  </div>

  <script>
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          alert("User registered successfully!");
          signupForm.reset();
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  </script>
</body>
</html>
*/
