# 🏠 Nestora

**Nestora** is a powerful and modern **MERN stack real estate application** that allows users to explore, list, and manage properties seamlessly. Designed for **buyers, agents, and admins**, it features authentication, payment integration, role-based dashboards, and more.

🔗 **Live Site:** [Visit Nestora](https://thaqiulislamkafi-assignment-11.netlify.app/)

---

## 📌 Features

### 1. 🔐 Firebase Authentication  
Secure user login and registration using Firebase. Supports role-based access (Admin, Agent, Buyer).

### 2. 🧑‍💼 Role-Based Dashboard  
Custom dashboards for Admins and Agents. Admins manage users and listings, while Agents control their own properties.

### 3. 🏘️ Property Listings  
Dynamic property listing cards with details such as price, location, size, and category (sale/rent).

### 4. 🔍 Advanced Property Filtering  
Users can filter listings based on price, type, location, and availability, providing a smooth property browsing experience.

### 5. 🏠 Add & Manage Listings  
Agents can add new properties with image uploads and edit or delete their existing listings from their dashboard.

### 6. 💳 Stripe Payment Integration  
Secure and fast payments for premium listings or featured properties using Stripe.

### 7. 🧠 Dynamic Page Titles  
Each route updates the browser tab dynamically using `react-helmet-async` to improve SEO and navigation clarity.

### 8. 🎞️ Swiper Image Carousels  
Beautiful sliders for property images and homepage banners powered by the `swiper` library.

### 9. 🧾 React Hook Form Integration  
Clean and validated form handling for listing creation, user registration, and contact inquiries.

### 10. ⚡ Optimized Data Fetching with React Query  
Efficient and consistent data fetching using `@tanstack/react-query` ensures fast and reliable user interactions.

### 11. 🎯 SweetAlert2 Notifications  
Interactive success, error, and confirmation popups using SweetAlert2 for key actions like login, payments, and deletions.

### 12. 📱 Fully Responsive UI  
Mobile-friendly and responsive design using TailwindCSS to ensure accessibility across all device sizes.

---

## 🧑‍💻 Admin and Agent Login

To test the platform’s features, use the sample credentials below:

### 🔑 Admin Account
- **Email**: `admin@nestora.com`
- **Password**: `Admin@123`

### 🧑 Agent Account
- **Email**: `agent@nestora.com`
- **Password**: `Agent@123`

> ⚠️ These are sample credentials for demonstration purposes. Ensure actual credentials are stored and managed securely in production.

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

## 📄 Author

> **Thaqi Ul Islam Kafi**  
> MERN Stack Developer

---
