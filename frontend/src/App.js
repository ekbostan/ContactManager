import React, { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";

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

  const handleSearchResults = (results) => {
    setFilteredContacts(results);
  };

  const handleDeleteContact = async (email) => {
    try {
      const response = await fetch(`http://localhost:5001/contacts/${email}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact.");
      }
      const updatedContacts = contacts.filter(
        (contact) => contact.email !== email
      );
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="bg-blue-600 w-full py-4 shadow-md">
        <h1 className="text-3xl text-center text-white font-bold">
          Contact Manager
        </h1>
      </header>
      <main className="w-full max-w-4xl p-6 mt-6 bg-white rounded-lg shadow-lg">
        <ContactForm onAddContact={handleAddContact} />
        <SearchBar
          onSearchResults={handleSearchResults}
          allContacts={contacts}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </main>
    </div>
  );
};

export default App;
