@echo off
echo Starting Habit Tracker with Docker...

REM Check if .env file exists
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo Please edit .env file with your actual configuration values
    pause
)

REM Start the application
echo Starting containers...
docker-compose up --build

pause
