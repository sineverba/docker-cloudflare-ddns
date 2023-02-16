#!/usr/bin/env sh
echo "============================="
echo "CRON >>> Job started: $(date)"
node --no-deprecation /app/src/index.js
echo "CRON >>> Job finished: $(date)"
echo "============================="