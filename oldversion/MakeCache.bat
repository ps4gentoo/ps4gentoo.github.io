@echo off
echo CACHE MANIFEST > temp0.txt
echo # Linux Loaders >> temp0.txt
echo # %DATE%-%TIME% >> temp0.txt
echo. >> temp0.txt

set LOC=%~dp0

dir /B /S /A:-D >> temp0.txt

findstr /v ".bat .exe .mp4 .cache .psd .txt" temp0.txt > temp.txt
del temp0.txt

@echo off
setlocal enableextensions disabledelayedexpansion
set "search=%LOC%"
set "replace="
set "textFile=temp.txt"
for /f "delims=" %%i in ('type "%textFile%" ^& break ^> "%textFile%" ') do (
set "line=%%i"
setlocal enabledelayedexpansion
>>"%textFile%" echo(!line:%search%=%replace%!
endlocal)

setlocal DisableDelayedExpansion
set "firstLineReady="
(for /F "eol=$ delims=" %%a in (temp.txt) DO (
if defined firstLineReady (echo()
set "firstLineReady=1"
<nul set /p "=%%a")
) > offline.cache
del temp.txt

echo offline.cache created!!

TIMEOUT 2 >nul