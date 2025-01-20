import React from "react";

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact List</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found.</p>
      ) : (
        <ul className="space-y-2">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md flex justify-between items-center"
            >
              <div>
                <strong>{contact.name}</strong>: {contact.email}
              </div>
              <button
                onClick={() => onDeleteContact(contact.email)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
