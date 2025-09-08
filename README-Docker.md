# Habit Tracker - Docker Setup Guide

This guide explains how to run the Habit Tracker application using Docker containers.

## 🐳 Prerequisites

Before running the application, make sure you have:

- **Docker Desktop** installed on your system
- **Docker Compose** (comes with Docker Desktop)
- **Git** (to clone the repository)

### Installing Docker Desktop:
- **Windows/Mac**: Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Linux**: Follow the installation guide for your distribution

## 📁 Project Structure

```
habit-tracker/
├── backend/
│   ├── Dockerfile              # Production backend image
│   ├── .dockerignore           # Files to exclude from Docker build
│   ├── healthcheck.js          # Health check script
│   └── ...
├── frontend/
│   ├── Dockerfile              # Production frontend image
│   ├── Dockerfile.dev          # Development frontend image
│   ├── nginx.conf              # Nginx configuration for production
│   ├── .dockerignore           # Files to exclude from Docker build
│   └── ...
├── docker-compose.yml          # Production Docker Compose
├── docker-compose.dev.yml      # Development Docker Compose
├── .env.example                # Environment variables template
├── docker-start.bat            # Windows startup script
├── docker-start.sh             # Unix startup script
└── README-Docker.md            # This file
```

## 🚀 Quick Start

### Option 1: Using Startup Scripts

**Windows:**
```bash
# Double-click docker-start.bat
# OR run in Command Prompt:
docker-start.bat
```

**Linux/Mac:**
```bash
# Make script executable (first time only)
chmod +x docker-start.sh

# Run the script
./docker-start.sh
```

### Option 2: Manual Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd habit-tracker
```

2. **Create environment file:**
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env  # or use your preferred editor
```

3. **Start the application:**
```bash
# Production build
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

## 🛠️ Development Mode

For development with hot-reloading and live code changes:

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Or in background
docker-compose -f docker-compose.dev.yml up --build -d
```

## 🔧 Environment Configuration

Edit the `.env` file with your actual values:

```env
# Database Configuration
MONGO_URI=mongodb://mongo:27017/habit-tracker

# JWT Secret (CHANGE THIS!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Configuration (for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

# Application Port
PORT=5000

# Node Environment
NODE_ENV=production
```

## 📋 Services and Ports

| Service | Port | Description |
|---------|------|-------------|
| **Frontend** | 80 | React application (production) |
| **Frontend Dev** | 3000 | React development server |
| **Backend** | 5000 | Express.js API server |
| **MongoDB** | 27017 | Database server |
| **Mongo Express** | 8081 | Database admin interface |

## 🌐 Accessing the Application

Once containers are running:

- **Application**: http://localhost (production) or http://localhost:3000 (development)
- **API**: http://localhost:5000/api
- **Database Admin**: http://localhost:8081
  - Username: `admin`
  - Password: `admin123`

## 📊 Container Management

### View running containers:
```bash
docker-compose ps
```

### View logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f backend
```

### Stop containers:
```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (⚠️ This will delete database data!)
docker-compose down -v
```

### Restart a specific service:
```bash
docker-compose restart backend
```

### Rebuild containers:
```bash
# Rebuild all containers
docker-compose build --no-cache

# Rebuild specific service
docker-compose build --no-cache backend
```

## 🐛 Troubleshooting

### Common Issues:

1. **Port already in use:**
   ```bash
   # Find process using the port
   netstat -ano | findstr :5000
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Permission denied (Linux/Mac):**
   ```bash
   # Fix Docker permissions
   sudo usermod -aG docker $USER
   # Log out and back in
   ```

3. **MongoDB connection issues:**
   ```bash
   # Check if MongoDB container is running
   docker-compose ps
   
   # View MongoDB logs
   docker-compose logs mongo
   ```

4. **Frontend not loading:**
   - Check if the API URL in frontend is correct
   - Verify CORS settings in backend
   - Check browser console for errors

### Reset Everything:
```bash
# Stop all containers and remove everything
docker-compose down -v --rmi all

# Remove all Docker data (⚠️ CAUTION: This affects all Docker projects!)
docker system prune -a --volumes
```

## 🏗️ Building for Production

### Create production build:
```bash
# Build production images
docker-compose build

# Start production environment
docker-compose up -d
```

### Deploy to server:
1. Copy project files to server
2. Set up environment variables
3. Run: `docker-compose up -d`

## 📦 Docker Images

The application creates these Docker images:

- `habit-tracker-backend`: Node.js Express API
- `habit-tracker-frontend`: React app served by Nginx
- `mongo:7.0`: MongoDB database
- `mongo-express:latest`: Database admin interface

## 🔍 Health Checks

The application includes health checks:

- **Backend**: `GET /api/health`
- **Frontend**: Nginx serves static files
- **MongoDB**: Built-in health monitoring

Check container health:
```bash
docker-compose ps
# Look for "healthy" status
```

## 🆘 Getting Help

If you encounter issues:

1. Check the logs: `docker-compose logs [service-name]`
2. Verify environment variables in `.env`
3. Ensure all ports are available
4. Try rebuilding: `docker-compose build --no-cache`
5. Reset containers: `docker-compose down && docker-compose up --build`

## 🔒 Security Notes

- Change the default JWT secret in production
- Use strong passwords for email configuration
- Consider using Docker secrets for sensitive data
- Regularly update Docker images for security patches

---

**Happy habit tracking! 🎯**
