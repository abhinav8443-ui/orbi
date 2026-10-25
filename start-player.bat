@echo off
title Orbi Music Player - 100% Offline Vault Edition
echo ========================================================
echo             ORBI MUSIC PLAYER (100% Offline)
echo   Local Wi-Fi Host + PWA Offline Vault for Mobile Devices
echo ========================================================
echo Starting Orbi server on port 5173...
echo.

cd /d "%~dp0"
node server.js
pause
