## How to Set Up and Run the Application
1. Clone the repository: `git clone https://github.com/pallaveekumari/whatsappweb_like_application`
2. Navigate to the project directory: `cd whatsapp-webapp`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Technologies Used:

1. Html
2. CSS
3. Javascript
4. React.js
5. InstantDB 
6. IndexedDB 

## Features:

1. Real-time messaging using InstantDB 
2. Offline capabilities using IndexedDB 
3. Contact-based chat UI 
4. Responsive design 

## Documentation

## Modular Design:
Each functionality is implemented as a separate, reusable component (e.g., ContactList, ChatWindow).
State Management: React Context and useReducer are used to manage the global state of contacts and messages efficiently.

## Data Handling:
InstantDB is chosen for real-time synchronization of messages due to its speed and ease of use.
IndexedDB ensures that messages are stored locally for offline access.

## Challenges Faced

## Synchronization Between InstantDB and IndexedDB: 

It was challenging to handle real-time updates from InstantDB and ensure the local IndexedDB remained consistent. This was resolved by implementing utility functions to handle updates to both databases simultaneously.

## Performance Optimization: 

Managing a large number of messages while maintaining responsiveness required careful optimization of React rendering with useMemo.

## Usage of Core Concepts

## React Hooks:

## useState: 

Used for local state management, such as managing input fields and active contact.
## useEffect: 

Handles side effects like fetching initial data from IndexedDB and subscribing to real-time updates from InstantDB.
## useReducer: 

Centralized state management for messages and contacts with clear action types.

## React Context:

The global state for contacts and messages is provided through AppContext, making it accessible across components without prop drilling.

## Custom Hooks:

## useIndexedDB: 

Encapsulates logic for interacting with IndexedDB (saving and retrieving messages).

## useInstantDB: 

Manages real-time data synchronization with InstantDB.

## Reducer:

## messagesReducer: 

Used to handle state updates like adding new messages, deleting messages, and switching contacts.

## InstantDB:

Real-time message storage and retrieval are handled using API calls to InstantDB. Messages are pushed to InstantDB when sent and fetched in real time for display.
## IndexedDB:

Provides offline capabilities by storing messages and contacts locally. If InstantDB is unavailable, data is retrieved from IndexedDB.
