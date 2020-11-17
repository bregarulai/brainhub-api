const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/submit", (req, res) => {
  const { firstName, lastName, email, date } = req.body;
  if (!firstName || !lastName || !email || !date) {
    return res.status(400).json("Please fill all require fields");
  }
  res.send("Hello from api");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
