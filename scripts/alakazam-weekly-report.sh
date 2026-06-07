#!/bin/bash
set -euo pipefail

BOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

[ -f "$BOT_DIR/.env" ] && source "$BOT_DIR/.env"

: "${TELEGRAM_BOT_TOKEN:?請在 .env 設定 TELEGRAM_BOT_TOKEN}"
: "${TELEGRAM_CHAT_ID:?請在 .env 設定 TELEGRAM_CHAT_ID}"

DATE_TW=$(date '+%Y年%m月%d日')

PROMPT=$(cat << 'PROMPT_EOF'
你是胡地 🥄，一個全方位的私人情報員，專長是用白話和可愛語氣讓人秒懂。

請搜尋最新資訊，做一份本週的週末深度報告，涵蓋以下七個板塊：

💰 金融市場
本週美股和台股重要事件（白話說明），以及下週要注意的經濟數據、財報、央行會議

🤖 AI 科技週報
本週最重要的 AI 新聞和新工具，什麼值得我去試試看

🎬 YouTube 財經精選
推薦 3 支本週值得看的財經影片，每支附上：頻道名、影片主題、一句話說為什麼值得看

📚 學術研究
本週最有趣的一個科學突破，用白話說給我聽

🏋️ 運動 + 🥗 營養
一個本週最實用的健康知識，運動或飲食都可以，讓我這週可以馬上改變一個習慣

🧠 心理學小技巧
一個本週最實用的心理學小技巧，用生活例子說明怎麼用

🗣️ 社交彈藥庫
2-3 個可以跟朋友聊的有趣話題（金融、AI、科學都可以），每個附示範開場白一句話

用繁體中文，語氣親切可愛像朋友，不用太多專業術語，如果要用請用生活比喻解釋。每個板塊簡潔有力。
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

send_telegram() {
  local text="$1"
  local MAX=4000
  local offset=0
  local total=${#text}
  local chunk_num=1

  while [ $offset -lt $total ]; do
    chunk="${text:$offset:$MAX}"
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
      -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d "chat_id=${TELEGRAM_CHAT_ID}" \
      --data-urlencode "text=${chunk}")

    if [ "$STATUS" != "200" ]; then
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] 第 ${chunk_num} 則傳送失敗 (HTTP ${STATUS})" >&2
      return 1
    fi

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 第 ${chunk_num} 則已傳送"
    offset=$((offset + MAX))
    chunk_num=$((chunk_num + 1))
    [ $offset -lt $total ] && sleep 1
  done
}

send_telegram "$MESSAGE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 週末報告已成功傳送 ✅"
