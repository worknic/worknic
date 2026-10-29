@echo off
cd /d %~dp0
echo WORKNIC Naver Relay Setup
echo.
if not exist .env (
  copy .env.example .env >nul
  echo Created .env file.
)
npm install
echo.
echo Setup complete.
echo Open .env and fill NAVER_COMMERCE_CLIENT_ID, NAVER_COMMERCE_CLIENT_SECRET, WORKNIC_RELAY_TOKEN.
echo Then run start-windows.bat
pause
