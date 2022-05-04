#!/usr/bin/env sh
echo "============================="
echo "CRON >>> Job started: $(date)"
node --no-deprecation /app/index.js
echo "CRON >>> Job finished: $(date)"
echo "============================="