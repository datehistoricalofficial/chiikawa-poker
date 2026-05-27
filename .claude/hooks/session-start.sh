#!/bin/bash
# Restore Date Historical skill files from repo on every session start
set -euo pipefail

SKILL_SRC="$CLAUDE_PROJECT_DIR/.claude/skills"
SKILL_DST="$HOME/.claude/skills"

if [ -d "$SKILL_SRC" ]; then
  cp -r "$SKILL_SRC"/. "$SKILL_DST/"
fi
