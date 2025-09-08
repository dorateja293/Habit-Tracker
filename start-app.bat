@echo off
echo ==========================================
echo    HABIT TRACKER - DOCKER SETUP
echo ==========================================
echo.

echo [1/4] Checking if Docker Desktop is running...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ Docker Desktop is not running!
    echo.
    echo Please start Docker Desktop manually:
    echo   1. Press Windows Key + R
    echo   2. Type: Docker Desktop
    echo   3. Press Enter
    echo   4. Wait for Docker to fully load
    echo   5. Run this script again
    echo.
    pause
    exit /b 1
)

echo ✅ Docker is running!
echo.

echo [2/4] Checking environment file...
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env >nul
    echo ⚠️  Please edit .env file with your configuration
    echo    (Press Enter to continue with defaults)
    pause
)
echo ✅ Environment file ready!
echo.

echo [3/4] Building and starting containers...
echo This may take a few minutes for the first run...
echo.
docker-compose up --build

echo.
echo [4/4] Application should now be running at:
echo   📱 Frontend: http://localhost
echo   🔧 API: http://localhost:5000/api
echo   🗄️  Database Admin: http://localhost:8081
echo.
pause
