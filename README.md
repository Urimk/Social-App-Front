# Real-Time Chat Application (Frontend) 

A highly interactive, real-time messaging interface built with **React** and **Tailwind CSS**. This client application connects to a custom Node.js/Socket.io backend to deliver a seamless, responsive, and secure chat experience.

[Live Demo](https://social-5s72alo1p-uri-ks-projects.vercel.app) | [Backend Repository](https://github.com/Urimk/Social-App-Back)

##  Key Features

* **Real-Time UI:** Instant message delivery and active state synchronization powered by `socket.io-client`.
* **Client-Side Security:** Secure protected routing using React Router, and local token management for authenticated sessions.
* **Complex Form Handling:** Custom, robust form validation for user registration and login flows.
* **Dynamic Theme:** Built-in Dark/Light mode toggle with user preferences persisted in local storage.
* **Profile Management:** Intuitive UI for users to update their display name and preview profile pictures before uploading.
* **UX Enhancements:** Smooth error handling, loading states, and success feedback using Toast notifications.
* **Responsive Design:** Fully optimized for both mobile and desktop screens using utility-first CSS.

##  Tech Stack

* **Build Tool:** Vite
* **Framework:** React.js
* **Styling:** Tailwind CSS
* **WebSockets:** Socket.io-client
* **Routing:** React Router DOM
* **State Management:** React Hooks
* **HTTP Client:** Fetch API 
* **Notifications:** React Hot Toast

##  Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file (at the root of your project):

`VITE_API_URL` - The URL of your backend server (e.g., `http://localhost:4000`)

##  Run Locally

1. **Clone the project:**
   ```bash
   git clone [https://github.com/Urimk/Social-App-Front](https://github.com/Urimk/Social-App-Front)
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
---

Created by Uri Knoll
