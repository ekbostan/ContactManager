import React, { useState } from "react";

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add contact.");
      }

      const newContact = { name, email };
      onAddContact(newContact);
      setName("");
      setEmail("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-700">Add Contact</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-1/4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
