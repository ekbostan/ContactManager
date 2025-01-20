# ContactManager

## Overview

Contact List Manager application that allows users to:

- Add contacts with name and email.
- View a list of all contacts.
- Search for contacts by name or email.
- Delete Contacts

## Setup Instructions

### Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
  ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Run the tests:
    ```bash
   npx jest
   ```
### Frontend

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
    ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Features

1. Add Contact: Users can add a contact by providing a name and email. Input validation ensures no empty fields or duplicate emails.
2. View Contacts: Displays a dynamic list of all stored contacts.
3. Search Contacts: Enables searching by name or email. Search functionality is handled on the backend.
   To improve performance, caching mechanisms could be implemented for frequently searched queries.
4. Delete Contact: Users can remove a contact from the list.

### Design Decisions

1. In-Memory Storage: For simplicity and time constraints, an in-memory array was used to store contacts. A relational database (e.g., PostgreSQL) would typically be used in a production environment to ensure data persistence and scalability.
2. Search Logic: The search functionality is implemented on the backend, which filters contacts by name or email. For larget data sets indexing or caching maybe better.

### Future Enhancements

1. Adding pagination for larger contact lists.
2. Using a persistent data storage such as PostgreSQL or MySQL.
3. Enhance the searching function via caching or indexing.
