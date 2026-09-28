$ErrorActionPreference = "Stop"
$backendDir = Join-Path $PSScriptRoot "backend"
$python = Join-Path $backendDir "venv\Scripts\python.exe"

if (-not (Test-Path $python)) {
    throw "Backend virtual environment not found at $python. Create it and install backend\requirements.txt first."
}

Write-Host "Swagger UI: http://127.0.0.1:8000/docs"
Push-Location $backendDir
try {
    & $python -m uvicorn app.main:app --reload --reload-dir app --host 127.0.0.1 --port 8000
}
finally {
    Pop-Location
}