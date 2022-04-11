#!/usr/bin/env sh
echo "============================="
echo ""
echo ""
echo "CRON >>> Job started: $(date)"
echo ""
node --no-deprecation /app/index.js
echo ""
echo "CRON >>> Job finished: $(date)"
echo ""
echo ""
echo "============================="