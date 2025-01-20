import React, { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:5001/contacts");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts.");
        }
        const data = await response.json();
        setContacts(data);
        setFilteredContacts(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchContacts();
  }, []);

  const handleAddContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
    setFilteredContacts((prev) => [...prev, contact]);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="bg-blue-400 w-full py-4 shadow-md">
        <h1 className="text-3xl text-center text-white font-bold">
          Contact Manager
        </h1>
      </header>
      <main className="w-full max-w-4xl p-6 mt-6 bg-white rounded-lg shadow-lg">
        <ContactForm onAddContact={handleAddContact} />
        <ContactList contacts={filteredContacts} />
      </main>
    </div>
  );
};

export default App;
