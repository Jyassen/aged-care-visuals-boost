#!/usr/bin/env bash
# Renders the 2027 free-guide HTML sources to PDFs in public/guides using headless Chrome.
# Usage: scripts/yourmedguy/guides-2027/build-guides.sh
# Requires Google Chrome and an internet connection (Inter loads from Google Fonts).
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../../.." && pwd)"
OUT="$ROOT/public/guides"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

mkdir -p "$OUT"

render() {
  local src="$1" dest="$2"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 \
    --print-to-pdf="$OUT/$dest" "file://$HERE/$src" 2>/dev/null
  echo "wrote public/guides/$dest"
}

render 10-questions.html  YourMedGuy-10-Questions-2027.pdf
render vip-contacts.html  YourMedGuy-Medicare-VIP-Contacts-NY-2027.pdf
render myths.html         YourMedGuy-Medicare-Myths-vs-Reality-2027.pdf
