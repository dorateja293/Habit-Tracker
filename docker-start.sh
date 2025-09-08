#!/bin/bash

echo "Starting Habit Tracker with Docker..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please edit .env file with your actual configuration values"
    read -p "Press enter to continue..."
fi

# Start the application
echo "Starting containers..."
docker-compose up --build
