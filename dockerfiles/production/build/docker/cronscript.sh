#!/usr/bin/env sh
echo "============================="
echo "CRON >>> Job started: $(date)"
node /app/index.js
echo "CRON >>> Job finished: $(date)"
echo "============================="