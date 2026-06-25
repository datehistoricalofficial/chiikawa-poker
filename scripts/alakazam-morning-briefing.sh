#!/bin/bash
set -euo pipefail

BOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.."; pwd)"

# set -a exports ALL variables from .env to child processes (including claude CLI)
# Without this, ANTHROPIC_API_KEY is set in the shell but not exported → 401 error
set -a
[ -f "$BOT_DIR/.env" ] && source "$BOT_DIR/.env"
set +a

: "${TELEGRAM_BOT_TOKEN:?請在 .env 設定 TELEGRAM_BOT_TOKEN}"
: "${TELEGRAM_CHAT_ID:?請在 .env 設定 TELEGRAM_CHAT_ID}"
: "${ANTHROPIC_API_KEY:?請在 .env 設定 ANTHROPIC_API_KEY（前往 https://console.anthropic.com/ 取得）}"

DATE_TW=$(date '+%Y年%m月%d日 %A')

# 依星期幾決定今日冷知識主題（%u: 1=週一 ... 7=週日）
DOW=$(date '+%u')
case $DOW in
  1) DAILY_TOPIC="🏋️ 運動科學（搜尋一個最新的運動科學研究，用白話解釋，讓我明天可以馬上用到）" ;;
  2) DAILY_TOPIC="🥗 營養學（找一個有趣的最新營養研究，破解一個食物謠言或教一個聰明飲食技巧）" ;;
  3) DAILY_TOPIC="🧠 心理學（分享一個有趣的心理學現象或研究，用生活例子解釋，讓我覺得 wow）" ;;
  4) DAILY_TOPIC="📚 學術新發現（找本週最有趣的一個科學突破，用白話說給我聽，不要太長）" ;;
  5) DAILY_TOPIC="🔧 AI 工具實測（推薦一個這週出現的新 AI 工具，說明能幹嘛、怎麼用、適合什麼人）" ;;
  *) DAILY_TOPIC="💡 自由選題（選一個今天最有趣的事情分享，可以是科學、生活、或任何有趣知識）" ;;
esac

PROMPT=$(cat << PROMPT_EOF
你是胡地 🥄，一個全方位的私人情報員，專長是用白話和可愛語氣讓人秒懂。

請搜尋最新資訊，做一份今天的早安簡報，每個段落簡短有力（3-5句話就好）：

1. ☕ 美股昨晚怎麼了
主要指數（道瓊、S&P500、納斯達克）漲跌多少，用白話說原因，像朋友聊天那樣

2. ☕ 台股今天重點
外資動向、有沒有什麼大新聞值得關注

3. ☕ 朋友聊天素材
一個可以跟做股票或對沖基金朋友聊的話題，給一句示範開場白

4. 🤖 AI 快報
Claude、ChatGPT、Codex 或其他 AI 工具最新動態，一兩句說重點就好

5. 今日冷知識 — ${DAILY_TOPIC}

用繁體中文，語氣親切可愛像朋友，絕對不會讓人覺得聽不懂。
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

    offset=$((offset + MAX))
    chunk_num=$((chunk_num + 1))
    [ $offset -lt $total ] && sleep 1
  done
}

send_telegram "$MESSAGE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 早安簡報已成功傳送 ✅"
