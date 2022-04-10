#!/bin/sh
# First run
/app/cronscript.sh
# start cron
/usr/sbin/crond -f -l 8