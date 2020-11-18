const express = require("express");
const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
  },
});

const app = express();
app.use(express.json());

app.post("/submit", (req, res) => {
  const { firstName, lastName, email, date } = req.body;
  if (!firstName || !lastName || !email || !date) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  console.log(req.body);

  db.returning("*")
    .insert({
      firstName: firstName,
      lastName: lastName,
      email: email,
      date: date,
    })
    .into("event")
    .then((event) => {
      res.json({ body: event, message: "event saved successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Unable to save event" });
    });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
