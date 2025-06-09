@echo off
REM Script to delete the obsolete src\game-themes\mega-slots.theme.ts file

SET "FILE_TO_DELETE=src\game-themes\mega-slots.theme.ts"
REM Assuming this script is run from the project root directory.
REM If your project root is elsewhere, adjust the path above or cd to project root first.

echo This script will attempt to delete the following obsolete theme file:
echo %FILE_TO_DELETE%
echo.

IF EXIST "%FILE_TO_DELETE%" (
    CHOICE /C YN /M "Are you sure you want to permanently delete this file?"
    IF ERRORLEVEL 2 (
        echo Deletion cancelled by user.
    ) ELSE (
        del "%FILE_TO_DELETE%"
        IF EXIST "%FILE_TO_DELETE%" (
            echo Error: Failed to delete %FILE_TO_DELETE%. Check permissions or if the file is in use.
        ) ELSE (
            echo Successfully deleted %FILE_TO_DELETE%.
        )
    )
) ELSE (
    echo File %FILE_TO_DELETE% does not exist. No action needed.
)

echo.
pause
exit /b 0
