#!/bin/bash
set -euo pipefail

BOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

[ -f "$BOT_DIR/.env" ] && source "$BOT_DIR/.env"

: "${TELEGRAM_BOT_TOKEN:?請在 .env 設定 TELEGRAM_BOT_TOKEN}"
: "${TELEGRAM_CHAT_ID:?請在 .env 設定 TELEGRAM_CHAT_ID}"

DATE_TW=$(date '+%Y年%m月%d日')

PROMPT=$(cat << 'PROMPT_EOF'
你是胡地 🥄，一個親切可愛的私人財經情報員。

請搜尋最新資訊，做一份本週的週末深度財經報告，格式如下：

🥄 胡地週末深度報告 🗓️

📊 本週市場回顧
美股和台股這週發生的重要事件，白話說明漲跌原因，像跟朋友聊一樣

🔭 下週要注意什麼
下週有哪些重要的經濟數據公布、財報、央行會議等值得注意的事

💡 本週最值得了解的趨勢
選一個這週最有意思的大趨勢，解釋清楚是什麼、為什麼重要、對一般人有什麼影響

🗣️ 社交彈藥庫
2-3 個可以跟做金融、股票、對沖基金朋友聊的話題，每個都附上示範開場白一句話

用繁體中文，語氣親切可愛像朋友，不要用太多專業術語，如果要用請用生活比喻解釋。
PROMPT_EOF
)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 開始產生週末深度報告..."

REPORT=$(claude -p "$PROMPT" --allowedTools "WebSearch,WebFetch" --model claude-opus-4-8 2>&1)

if [ -z "$REPORT" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 錯誤：Claude 沒有回應" >&2
  exit 1
fi

MESSAGE="🥄 胡地週末深度報告 🗓️ ${DATE_TW}

${REPORT}"

send_telegram_chunk() {
  local text="$1"
  curl -s -o /dev/null -w "%{http_code}" \
    -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d "chat_id=${TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=${text}"
}

# 週報較長，超過 4000 字就分兩則傳送
if [ ${#MESSAGE} -gt 4000 ]; then
  PART1="${MESSAGE:0:4000}"
  PART2="（續）${MESSAGE:4000}"

  STATUS1=$(send_telegram_chunk "$PART1")
  STATUS2=$(send_telegram_chunk "$PART2")

  if [ "$STATUS1" = "200" ] && [ "$STATUS2" = "200" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 週末報告已成功傳送（分兩則）✅"
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Telegram 傳送失敗，HTTP 狀態：${STATUS1} / ${STATUS2}" >&2
    exit 1
  fi
else
  STATUS=$(send_telegram_chunk "$MESSAGE")
  if [ "$STATUS" = "200" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 週末報告已成功傳送 ✅"
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Telegram 傳送失敗，HTTP 狀態：${STATUS}" >&2
    exit 1
  fi
fi
