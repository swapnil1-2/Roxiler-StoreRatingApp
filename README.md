# Store Rating System : Full Stack Application

A role-based platform where users rate stores, admins manage the system, and store owners track ratings.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- React.js
- JWT Authentication

---

## Features

### Admin
- Add users (admin, normal, storeOwner)
- Add stores with owner assignment
- View dashboard stats
- Filter users and stores
- View detailed user info

### Normal User
- Sign up / login
- View & search stores
- Submit and update rating (1–5)
- Update password

### Store Owner
- View users who rated their store
- See average store rating
- Update password

---

## API Endpoints

### AUTH

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login |

### ADMIN

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/stats | Dashboard stats |
| GET | /api/admin/users | List users |
| GET | /api/admin/stores | List stores |
| POST | /api/admin/add-user | Add user |
| POST | /api/admin/add-store | Add store |

### USER

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/user/stores | Get stores |
| POST | /api/user/rate | Rate store |
| PUT | /api/user/update-password | Change password |

### STORE OWNER

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/owner/ratings | View ratings |
| PUT | /api/owner/update-password | Change password |

---

## Installation

### Backend

```bash
cd backend
npm install
npm start
