const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

const contacts = []; // Db for now

app.post("/contacts", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required." });
  }

  const duplicate = contacts.find((contact) => contact.email === email);
  if (duplicate) {
    return res
      .status(400)
      .json({ message: "Contact with this email already exists." });
  }

  contacts.push({ name, email });
  res.status(201).json({ message: "Contact added successfully." });
});

app.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
