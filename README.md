# Authentication_System using JWT

Link: https://authentication-system-frontend-29cz.onrender.com

🚀 Project Overview
This project demonstrates a full-stack authentication system:
- Backend: Express + MongoDB + JWT + secure password hashing.
- Frontend: React + Vite + context-driven auth flow.
- Features: register, login, refresh token, logout, protected route.

📁 Repository Structure
- `backend/`
  - `src/app.js` - Express app setup
  - `src/server.js` - startup, dotenv, DB connect
  - `src/routes/auth.routes.js` - auth endpoint definitions
  - `src/controllers/auth.controller.js` - register/login/refresh/logout
  - `src/middlewares/auth.middleware.js` - JWT protect middleware
  - `src/models/user.model.js` - Mongoose user model with password encryption
  - `src/services/token.service.js` - JWT generation functions
  - `src/config/db.js` - mongoose connect wrapper
  - `src/utils/apiResponse.js` - response helper (optional)

- `frontend/`
  - `src/main.jsx` - app entry point
  - `src/App.jsx` - router + global layout
  - `src/context/AuthContext.jsx` - auth state & actions
  - `src/api/axios.js` - Axios instance + interceptors
  - `src/pages/Register.jsx`, `Login.jsx`, `Profile.jsx`
  - `src/components/ProtectedRoute.jsx` etc.

🛠️ Tech Stack
- Node 18+ / npm
- Express 5
- MongoDB / Mongoose
- JWT: `jsonwebtoken`
- Password hashing: `bcryptjs`
- Cookies: `cookie-parser`
- CORS enabled for frontend
- React 18 + Vite

📦 Backend Setup
1. `cd backend`
2. `npm install`
3. copy `.env.example` to `.env` (or create `.env`):
   - `PORT=5000`
   - `MONGO_URI=mongodb://localhost:27017/auth_system` (or Atlas URL)
   - `ACCESS_TOKEN_SECRET=<your secret>`
   - `REFRESH_TOKEN_SECRET=<your secret>`
   - `ACCESS_TOKEN_EXPIRY=15m`
   - `REFRESH_TOKEN_EXPIRY=7d`
4. Fix missing import if needed:
   - in `src/controllers/auth.controller.js` add `import jwt from "jsonwebtoken";`
5. `npm run dev`


🖥️ Frontend Setup
1. `cd frontend`
2. `npm install`
3. set API URL in `src/api/axios.js` (e.g. `baseURL: "http://localhost:5000/api/auth"`)
4. `npm run dev`


🧩 API Endpoints (Postman)

Base: `http://localhost:<PORT>/api/auth`

POST `/register`
- body `raw JSON`
  - `name`, `email`, `password`

POST `/login`
- body `raw JSON`
  - `email`, `password`
- response: `accessToken` + cookie `refreshToken`

GET `/refresh`
- sends `refreshToken` cookie
- returns new `accessToken`

POST `/logout`
- header `Authorization: Bearer <accessToken>`
- logs out and clears refresh token

GET `/profile`
- header `Authorization: Bearer <accessToken>`
- protected route

🔒 Security Notes
- Passwords are hashed via `bcryptjs` in `user.model.js` pre-save hook.
- `login` uses `isPasswordCorrect` method.
- `/refresh` uses `jwt.verify` with `REFRESH_TOKEN_SECRET`.
- `/profile` and `/logout` require valid access token.

🧪 Testing Flow (Postman)
1. Register new user with `/register`.
2. Login with `/login`; store `accessToken` and cookie.
3. Access `/profile` with Authorization header.
4. Call `/refresh` with cookie to get renewal token.
5. Logout with `/logout` (auth header).

🐛 Common issue + fix
- In `src/controllers/auth.controller.js`, add:
  - `import jwt from "jsonwebtoken";`
- Without this, `/refresh` throws `ReferenceError: jwt is not defined`.

📈 Improvement ideas
- add validation with `joi` or `express-validator`
- add explicit refresh token DB revocation list
- secure `cors.origin` to frontend host in production
- add unit/integration tests with Jest + Supertest

📄 References
- JWT auth patterns
- MERN best practices
- secure cookie and token lifetimes

---
