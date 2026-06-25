#!/bin/bash
set -euo pipefail

BOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.."; pwd)"

echo "🥄 開始設定胡地 (Alakazam)..."
echo ""

# 確認 claude CLI 存在
if ! command -v claude &> /dev/null; then
  echo "❌ 找不到 claude 指令，請先安裝 Claude Code CLI："
  echo "   https://claude.ai/code"
  exit 1
fi
echo "✅ Claude Code CLI 已安裝：$(which claude)"

# 確認 curl 存在
if ! command -v curl &> /dev/null; then
  echo "❌ 找不到 curl，請先安裝"
  exit 1
fi
echo "✅ curl 已安裝"

# 建立 logs 目錄
mkdir -p "$BOT_DIR/logs"
echo "✅ logs 目錄已建立：$BOT_DIR/logs"

# 設定 .env
if [ ! -f "$BOT_DIR/.env" ]; then
  cp "$BOT_DIR/.env.example" "$BOT_DIR/.env"
  echo ""
  echo "📝 已建立 .env 檔案，請填入你的設定："
  echo "   $BOT_DIR/.env"
  echo ""
  echo "   ANTHROPIC_API_KEY  →  從 https://console.anthropic.com/ 取得（⚠️ 必填，否則 401 錯誤）"
  echo "   TELEGRAM_BOT_TOKEN →  從 @BotFather 拿到的 token"
  echo "   TELEGRAM_CHAT_ID   →  傳訊息給 @userinfobot 查詢你的 chat id"
  echo ""
  read -p "填好後按 Enter 繼續..." _
else
  echo "✅ .env 已存在"
fi

# 確認 .env 有填內容
set -a
source "$BOT_DIR/.env"
set +a

if [ -z "${ANTHROPIC_API_KEY:-}" ] || [ "${ANTHROPIC_API_KEY}" = "your_anthropic_api_key_here" ]; then
  echo "❌ 請先填入 ANTHROPIC_API_KEY（前往 https://console.anthropic.com/ 取得）"
  echo "   這是 401 認證錯誤的根本原因 — crontab 不會載入你的 .zshrc"
  exit 1
fi
echo "✅ ANTHROPIC_API_KEY 已設定"

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ "${TELEGRAM_BOT_TOKEN}" = "your_bot_token_here" ]; then
  echo "❌ 請先填入 TELEGRAM_BOT_TOKEN"
  exit 1
fi
if [ -z "${TELEGRAM_CHAT_ID:-}" ] || [ "${TELEGRAM_CHAT_ID}" = "your_chat_id_here" ]; then
  echo "❌ 請先填入 TELEGRAM_CHAT_ID"
  exit 1
fi
echo "✅ Telegram 設定已載入"

# 讓腳本可執行
chmod +x "$BOT_DIR/scripts/alakazam-morning-briefing.sh"
chmod +x "$BOT_DIR/scripts/alakazam-weekly-report.sh"
echo "✅ 腳本已設為可執行"

# 安裝 crontab
echo ""
echo "📅 安裝 crontab 排程..."
crontab "$BOT_DIR/scheduled-tasks/crontab-with-alakazam.txt"
echo "✅ Crontab 已安裝"
echo ""
echo "目前的 crontab："
crontab -l
echo ""
echo "🎉 胡地設定完成！"
echo ""
echo "排程："
echo "  ☀️  每天 08:30 — 早安財經簡報"
echo "  🗓️  每週六 10:00 — 週末深度報告"
echo ""
echo "手動測試早安簡報："
echo "  $BOT_DIR/scripts/alakazam-morning-briefing.sh"
echo ""
