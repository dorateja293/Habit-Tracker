Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "    HABIT TRACKER - DOCKER SETUP" -ForegroundColor Cyan  
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Checking if Docker Desktop is running..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✅ Docker is running!" -ForegroundColor Green
}
catch {
    Write-Host ""
    Write-Host "❌ Docker Desktop is not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start Docker Desktop manually:" -ForegroundColor Yellow
    Write-Host "  1. Press Windows Key + R" -ForegroundColor White
    Write-Host "  2. Type: Docker Desktop" -ForegroundColor White
    Write-Host "  3. Press Enter" -ForegroundColor White
    Write-Host "  4. Wait for Docker to fully load" -ForegroundColor White
    Write-Host "  5. Run this script again" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[2/4] Checking environment file..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  Please edit .env file with your configuration" -ForegroundColor Yellow
    Write-Host "   (Press Enter to continue with defaults)" -ForegroundColor Gray
    Read-Host
}
Write-Host "✅ Environment file ready!" -ForegroundColor Green
Write-Host ""

Write-Host "[3/4] Building and starting containers..." -ForegroundColor Yellow
Write-Host "This may take a few minutes for the first run..." -ForegroundColor Gray
Write-Host ""

try {
    docker-compose up --build
}
catch {
    Write-Host "❌ Error starting containers!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[4/4] Application should now be running at:" -ForegroundColor Green
Write-Host "  📱 Frontend: http://localhost" -ForegroundColor White
Write-Host "  🔧 API: http://localhost:5000/api" -ForegroundColor White  
Write-Host "  🗄️ Database Admin: http://localhost:8081" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"
