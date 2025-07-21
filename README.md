# 🏠 Nestora

**Nestora** is a powerful and modern **MERN stack real estate application** that allows users to explore, list, and manage properties seamlessly. Designed with both **buyers** and **real estate agents** in mind, it features authentication, payment integration, admin management, and more.

🔗 **Live Site:** [Visit Nestora](https://thaqiulislamkafi-assignment-11.netlify.app/)

---

## 📌 Features

### 🔐 Firebase Authentication
Firebase Auth ensures secure user login, registration, and role-based access (admin, agent, user) using email and password.

### 🏘️ Property Listings & Management
Users can browse listings, while agents can add and manage their properties. Properties include images, pricing, location, and property details.

### 💳 Stripe Integration
Stripe is used to securely handle payments for premium property features or rental transactions.

### 📊 Admin Dashboard
Admins can manage all users, approve or reject listings, and maintain control over platform content.

### 🧑‍💼 Agent Dashboard
Real estate agents get access to their own dashboard to list, edit, and remove properties.

### ⚡ React Query Integration
Efficient client-side data management with real-time updates using `@tanstack/react-query`.

### ✨ UI Enhancements
Includes dynamic page titles, animated banners, marquees, sliders, and interactive alerts for a rich user experience.

---

## 🧑‍💻 Admin and Agent Login

To access dashboards and test role-based functionality, use the following credentials:

### 🔑 Admin Account
- **Email**: `admin@nestora.com`
- **Password**: `Admin@123`

### 🧑 Agent Account
- **Email**: `agent@nestora.com`
- **Password**: `Agent@123`

> ⚠️ These are example credentials. Ensure actual credentials are handled securely in production with environment configs and protected routes.

---

## 🧩 Tech Stack

**Frontend**: React + TailwindCSS + Firebase Auth + Stripe  
**Backend**: Node.js + Express + MongoDB  
**Hosting**: Netlify (Frontend) & Vercel (Backend)

---

## 📦 NPM Packages Used

### ✅ Frontend Packages

- `@stripe/react-stripe-js` – Stripe payment elements for React.
- `@stripe/stripe-js` – Stripe JS SDK.
- `@tailwindcss/vite` – Tailwind integration with Vite.
- `@tanstack/react-query` – Powerful data-fetching and caching.
- `axios` – Promise-based HTTP client.
- `firebase` – Firebase SDK for auth and backend interaction.
- `react` & `react-dom` – Core React libraries.
- `react-awesome-reveal` – Animate components on scroll.
- `react-fast-marquee` – Scrollable marquee text.
- `react-hook-form` – Form handling and validation.
- `react-icons` – A library of icons for UI.
- `react-router` – SPA routing.
- `react-simple-typewriter` – Typewriter effect for text.
- `sweetalert2` – Custom alert and modal popups.
- `swiper` – Slider and carousel components.
- `tailwindcss` – Utility-first CSS framework.

### ✅ Backend Packages

- `cors` – Middleware for handling CORS.
- `dotenv` – Environment variable loader.
- `express` – Web framework for Node.js.
- `firebase-admin` – Admin SDK for Firebase (used for verifying tokens, managing users).
- `mongodb` – MongoDB Node.js driver.
- `stripe` – Stripe server SDK for secure payments.

---

## 🚀 Getting Started

### 🖥️ Frontend Setup

```bash
git clone https://github.com/yourusername/nestora.git
cd nestora/frontend
npm install
npm run dev
