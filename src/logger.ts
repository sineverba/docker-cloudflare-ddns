import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    /**
     * logMessage is similar to:
     * 
     * {
            "message": "App started!",
            "level": "info",
            "service": "docker-cloudflare-ddns",
            "timestamp": "2024-03-20 12:27:05"
        }
     */
    winston.format.printf(
      (logMessage) =>
        `${logMessage.timestamp} - ${logMessage.level.toUpperCase()} - ${logMessage.message}`,
    ),
  ),
  defaultMeta: { service: "docker-cloudflare-ddns" },
  transports: [
    new winston.transports.Stream({
      stream: process.stderr,
      level: process.env.LOG_LEVEL ?? "debug",
    }),
  ],
});
