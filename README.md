# Real-Time Chat Application (Frontend) 💬

A highly interactive, real-time messaging interface built with **React** and **Tailwind CSS**. This client application connects to a custom Node.js/Socket.io backend to deliver a seamless, responsive, and secure chat experience.

[Live Demo](#) | [Backend Repository](#)

## ✨ Key Features

* **Real-Time UI:** Instant message delivery and UI updates powered by `socket.io-client`.
* **Dynamic Theme:** Built-in Dark/Light mode toggle with user preference saved in local storage.
* **Profile Management:** Intuitive UI for users to update their display name and upload profile pictures.
* **Friend & Chat System:** Search functionality and interactive chat rooms with active state management.
* **Protected Routing:** Secure navigation using React Router, ensuring only authenticated users (via JWT) can access the chat interface.
* **UX Enhancements:** Smooth error handling and success feedback using Toast notifications.
* **Responsive Design:** Fully optimized for both mobile and desktop screens using utility-first CSS.

## 🛠️ Tech Stack

* **Framework:** React.js
* **Styling:** Tailwind CSS
* **WebSockets:** Socket.io-client
* **Routing:** React Router DOM
* **State Management:** React Hooks (`useState`, `useEffect`, Context API)
* **Notifications:** React Hot Toast

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file (at the root of your project):

`REACT_APP_API_URL` (or `VITE_API_URL`) - The URL of your backend server (e.g., `http://localhost:4000`)

## 🚀 Run Locally

1. **Clone the project:**
   ```bash
   git clone [https://github.com/Urimk/your-frontend-repo-name.git](https://github.com/Urimk/your-frontend-repo-name.git)
2. **Navigate to the project directory:**
   ````bash
      cd your-frontend-repo-name
3. **Install dependencies:**
   ```bash
   npm install
4. **Start the development server:**
     ```bash
   npm run dev
Roadmap (Upcoming Features)
[Add your future frontend features here, e.g., typing indicators, read receipts, message search]

Created by Uri Knoll
