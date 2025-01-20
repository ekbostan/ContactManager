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

app.get("/contacts/search", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.email.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json(filteredContacts);
});

app.delete("/contacts/:email", (req, res) => {
  const { email } = req.params;

  const index = contacts.findIndex((contact) => contact.email === email);
  if (index === -1) {
    return res.status(404).json({ message: "Contact not found." });
  }

  contacts.splice(index, 1);
  res.status(200).json({ message: "Contact deleted successfully." });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
