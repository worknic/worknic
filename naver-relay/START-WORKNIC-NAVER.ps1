$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here

Write-Host ""
Write-Host "WORKNIC NAVER API RELAY" -ForegroundColor Green
Write-Host "This window must stay open while the API connection is in use."
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js is required. Opening download page..." -ForegroundColor Yellow
  Start-Process "https://nodejs.org/en/download"
  Write-Host "Install Node.js LTS, then run this file again."
  Read-Host "Press Enter to close"
  exit 1
}

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing relay components..."
  npm install
}

if (-not (Test-Path "cloudflared.exe")) {
  Write-Host "Downloading secure tunnel..."
  Invoke-WebRequest -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" -OutFile "cloudflared.exe"
}

$clientId = Read-Host "Naver Application ID"
$clientSecretSecure = Read-Host "Naver Application Secret" -AsSecureString
$relayTokenSecure = Read-Host "WORKNIC_ADMIN_TOKEN (same value saved in Vercel)" -AsSecureString

$ptr1 = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($clientSecretSecure)
$ptr2 = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($relayTokenSecure)
try {
  $env:NAVER_COMMERCE_CLIENT_ID = $clientId
  $env:NAVER_COMMERCE_CLIENT_SECRET = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr1)
  $env:WORKNIC_RELAY_TOKEN = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr2)
  $env:PORT = "8787"

  Write-Host ""
  Write-Host "Starting local relay..."
  $node = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $here -PassThru -NoNewWindow
  Start-Sleep -Seconds 2

  try {
    $health = Invoke-RestMethod -Uri "http://127.0.0.1:8787/health"
    if (-not $health.ok) { throw "Health check failed" }
    Write-Host "Local relay: OK" -ForegroundColor Green
  } catch {
    if ($node -and -not $node.HasExited) { Stop-Process -Id $node.Id -Force }
    throw
  }

  Write-Host ""
  Write-Host "Opening secure public tunnel..." -ForegroundColor Cyan
  Write-Host "When a URL like https://xxxxx.trycloudflare.com appears, copy only that URL and send it in ChatGPT." -ForegroundColor Yellow
  Write-Host ""
  & "$here\cloudflared.exe" tunnel --url http://127.0.0.1:8787
}
finally {
  if ($ptr1 -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr1) }
  if ($ptr2 -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr2) }
  if ($node -and -not $node.HasExited) { Stop-Process -Id $node.Id -Force }
}
