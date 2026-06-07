#!/bin/bash
set -euo pipefail

BOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

[ -f "$BOT_DIR/.env" ] && source "$BOT_DIR/.env"

: "${TELEGRAM_BOT_TOKEN:?請在 .env 設定 TELEGRAM_BOT_TOKEN}"
: "${TELEGRAM_CHAT_ID:?請在 .env 設定 TELEGRAM_CHAT_ID}"

DATE_TW=$(date '+%Y年%m月%d日 %A')

PROMPT=$(cat << 'PROMPT_EOF'
你是胡地 🥄，一個親切可愛的私人財經情報員。

請搜尋最新資訊，做一份今天的早安財經簡報，格式如下：

🥄 胡地早安簡報 ☀️

1. ☕ 美股昨晚怎麼了
幫我說昨晚美股主要指數（道瓊、S&P500、納斯達克）漲跌多少，用白話說原因，像朋友聊天那樣

2. ☕ 台股今天重點
外資今天買了什麼賣了什麼、有沒有什麼大新聞值得關注

3. ☕ 朋友聊天素材
一個可以跟做股票或對沖基金的朋友聊的話題，包括：這個話題的背景、可以怎麼開口說（給我一句示範台詞）

4. 🤖 AI 快報
最新的 AI 工具和趨勢，像是 Claude、ChatGPT、Codex 有什麼更新，一兩句話說重點就好

用繁體中文，語氣要親切可愛像朋友，每個段落簡短有力。
PROMPT_EOF
)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 開始產生早安簡報..."

BRIEFING=$(claude -p "$PROMPT" --allowedTools "WebSearch,WebFetch" --model claude-opus-4-8 2>&1)

if [ -z "$BRIEFING" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 錯誤：Claude 沒有回應" >&2
  exit 1
fi

MESSAGE="🥄 胡地早安簡報 ☀️ ${DATE_TW}

${BRIEFING}"

# Telegram 訊息上限 4096 字，超過就截斷並加提示
if [ ${#MESSAGE} -gt 4000 ]; then
  MESSAGE="${MESSAGE:0:4000}

... 🥄（內容太長截斷了，完整版在 log 裡）"
fi

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=${MESSAGE}")

if [ "$HTTP_STATUS" = "200" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 早安簡報已成功傳送 ✅"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Telegram 傳送失敗，HTTP 狀態：${HTTP_STATUS}" >&2
  exit 1
fi
