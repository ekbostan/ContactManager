import React, { useState } from "react";

const SearchBar = ({ onSearchResults, allContacts }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      console.log("Empty search query. Showing all contacts.");
      onSearchResults(allContacts);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/contacts/search?query=${query}`
      );
      if (!response.ok) {
        throw new Error("Search failed.");
      }
      const results = await response.json();
      onSearchResults(results);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Reset filtered contacts if the search bar is cleared
    if (!value.trim()) {
      onSearchResults(allContacts);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name or email"
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center justify-center p-2">
        <button
          onClick={handleSearch}
          className="w-1/4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
