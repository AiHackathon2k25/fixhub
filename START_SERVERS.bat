@echo off
echo ========================================
echo Starting FixHub Servers
echo ========================================
echo.

echo Starting Backend Server (Port 4000)...
start cmd /k "cd backend && npm run dev"

timeout /t 5 /nobreak >nul

echo Starting Frontend Server (Port 3000)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers are starting!
echo ========================================
echo Backend: http://localhost:4000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul

