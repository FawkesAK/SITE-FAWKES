@echo off
title Site Fawkes - servidor local
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js nao encontrado. Instale a versao LTS em https://nodejs.org e rode de novo. & pause & exit /b 1)
if not exist node_modules (
  echo Instalando dependencias, pode levar alguns minutos...
  call npm install || (pause & exit /b 1)
)
echo.
echo Site no ar em http://localhost:8080
echo NAO FECHE ESTA JANELA enquanto estiver usando o site.
echo.
call npm run dev > servidor.log 2>&1
echo O servidor parou. Veja o arquivo servidor.log
pause
