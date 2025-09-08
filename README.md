# 🎯 Habit Tracker Web Application

[![GitHub Stars](https://img.shields.io/github/stars/dorateja293/Habit-Tracker?style=for-the-badge)](https://github.com/dorateja293/Habit-Tracker)
[![GitHub Forks](https://img.shields.io/github/forks/dorateja293/Habit-Tracker?style=for-the-badge)](https://github.com/dorateja293/Habit-Tracker)
[![GitHub Issues](https://img.shields.io/github/issues/dorateja293/Habit-Tracker?style=for-the-badge)](https://github.com/dorateja293/Habit-Tracker)

A comprehensive full-stack habit tracking web application built with React, Node.js, Express, and MongoDB. Track your daily habits, connect with friends, maintain accountability through social features, and achieve your personal goals.

## Features

- ✅ User authentication (JWT)
- ✅ Create, edit, delete habits
- ✅ Track habit completion streaks
- ✅ Filter habits by category
- ✅ Social features: follow friends, view activity feed
- ✅ Leaderboard based on streaks
- ✅ Email notifications for missed habits
- ✅ Responsive design with Tailwind CSS
- ✅ Docker support

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Nodemailer for email notifications
- Node-cron for scheduled tasks

### Deployment
- Docker & Docker Compose
- Vercel (frontend)
- Railway/Render (backend)
- MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:

Create `.env` file in backend directory:
```env
MONGO_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Running the Application

#### Option 1: Using Docker (Recommended)
```bash
docker-compose up --build
```

#### Option 2: Manual Setup

1. Start MongoDB (if running locally)

2. Start the backend:
```bash
cd backend
npm run dev
```

3. Start the frontend:
```bash
cd frontend
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Habits
- `GET /api/habits` - Get all user habits (optional ?category=Health)
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/complete` - Mark habit as complete
- `GET /api/habits/:id/progress` - Get habit progress and streaks

### Social Features
- `GET /api/users/leaderboard` - Get users leaderboard
- `POST /api/users/:id/follow` - Follow a user
- `GET /api/users/:id/feed` - Get friends activity feed

### Notifications
- `POST /api/notifications/send` - Send daily reminders

## Project Structure

```
habit-tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── public/
├── docker-compose.yml
└── README.md
```

## Deployment

### Frontend (Vercel)
1. Push frontend code to GitHub
2. Connect to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`

### Backend (Railway/Render)
1. Push backend code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ using React and Node.js
- Styled with Tailwind CSS
- Icons from Heroicons
