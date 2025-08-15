# Resume Builder

A **Resume Builder Web App** with **Laravel** as the backend and **React** as the frontend.
This project allows users to manage their resume data (Experiences, Education, Skills, Projects, Certificates) and display it dynamically.

---

## 📂 Project Structure

```
resume-backend/         # Laravel Backend
├── app/                # Laravel application files
├── database/           # Migrations & seeders
├── public/             # Public assets
├── resume-frontend/    # React Frontend
│   ├── src/            # React source code
│   ├── public/         # React public assets
│   ├── package.json    # React dependencies & scripts
│   └── ...
├── package.json        # Root scripts to run Laravel + React
└── ...
```

---

## 🚀 Features

* **Authentication** (Login/Register)
* Manage Resume Sections:

  * Experiences
  * Education
  * Skills
  * Projects
  * Certificates
* Profile Picture Upload
* Integrated Laravel REST API
* React Frontend with Bootstrap UI

---

## 🛠 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/kresnadr03/resume-builder.git
cd resume-builder
```

### 2️⃣ Install Laravel dependencies

```bash
composer install
```

### 3️⃣ Install root Node.js dependencies (for running both backend & frontend together)

```bash
npm install
```

### 4️⃣ Install React dependencies

```bash
cd resume-frontend
npm install
cd ..
```

### 5️⃣ Setup environment

Copy `.env.example` to `.env` and adjust database credentials.

```bash
cp .env.example .env
```

Generate Laravel key:

```bash
php artisan key:generate
```

### 6️⃣ Run migrations

```bash
php artisan migrate
```

---

## ▶️ Running the Project

### Development Mode (Laravel + React together)

From the root folder:

```bash
npm run dev
```

* Laravel: [http://127.0.0.1:8000](http://127.0.0.1:8000)
* React: [http://localhost:3000](http://localhost:3000)

### Only Backend (Laravel)

```bash
npm run laravel
```

### Only Frontend (React)

```bash
npm run react
```

---

## 📦 Build for Production

Build the React app:

```bash
npm run react-build
```

This will generate static files in `resume-frontend/build/`.
You can configure Laravel to serve these files or deploy frontend separately.

---

## 📌 Notes

* Keep Laravel API running for frontend data to work.
* CORS is enabled in Laravel to allow frontend requests.
* All resume data is stored in a MySQL database.

---

Kalau mau, aku bisa tambahkan juga **cara deploy ke GitHub Pages** atau **cara deploy Laravel + React ke VPS** di README ini biar langsung siap publish. Mau aku tambahkan juga?
