@ECHO OFF

for /f "tokens=*" %%a in ('dir /s /b *.css') DO (
  ren "%%a" "%%~na.module.css" >> rename_log.txt 2>&1
)

echo Finished renaming CSS files.

