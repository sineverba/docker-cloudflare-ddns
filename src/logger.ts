const winston = require("winston");

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({
        level,
        message,
        label,
        timestamp,
      }: {
        level: string;
        message: string;
        label?: string;
        timestamp: string;
      }) => `${timestamp} ${label ?? "-"} ${level}: ${message}\n----------`,
    ),
  ),
  defaultMeta: { service: "docker-cloudflare-ddns" },
  transports: [
    new winston.transports.Stream({
      stream: process.stderr,
      level: process.env.LOG_LEVEL ?? "info",
    }),
  ],
});
