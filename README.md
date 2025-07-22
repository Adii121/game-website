# 🎮 GameHub

A dynamic game showcase website with a React frontend and Node.js + Express backend. Games and their details are fetched from a MongoDB Atlas database. Includes a secure admin panel to add, edit, and manage game entries.

---

## 🚀 Features

✅ Modern, responsive UI built with **React** and **Tailwind CSS**  
✅ **Node.js + Express** backend with REST API for CRUD operations  
✅ **MongoDB Atlas** for storing game data  
✅ Admin panel for adding, editing, and deleting games  
✅ Clean codebase structured for scalability  

---

## 🛠 Tech Stack

- 🌐 **Frontend:** React, Tailwind CSS  
- ⚙️ **Backend:** Node.js, Express  
- 🗄️ **Database:** MongoDB Atlas (Cloud)  
- 🔒 **Auth (planned):** JWT for admin access  

---

## 📂 Project Structure

game-website/
    client/ # React frontend (Coming soon)
    server/ # Node.js backend
        routes/ # API routes
        models/ # MongoDB models (Mongoose)
        .env # Environment variables (not tracked)
    .gitignore
    LICENSE
    README.md

---

## 🚀 Getting Started

1️⃣ Clone the repository

2️⃣ Install backend dependencies

3️⃣ Configure environment variables

4️⃣ Start the backend server

---

📡 API

GET /api/games

POST /api/games

PATCH /api/games/:id

DELETE /api/games/:id