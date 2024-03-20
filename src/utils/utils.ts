/**
 * File to collect some utilities
 */
import winston from "winston";
import { publicIpv4 } from "public-ip";

/**
 * Create logger instance to use in all project
 */
const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    /**
     * logMessage is similar to:
     *
     * {
     *   "message": "App started!",
     *   "level": "info",
     *   "service": "docker-cloudflare-ddns",
     *   "timestamp": "2024-03-20 12:27:05"
     * }
     */
    winston.format.printf(
      (logMessage: winston.Logform.TransformableInfo) =>
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

const getPublicIp = async (): Promise<string> => {
  try {
    return await publicIpv4();
  } catch (error) {
    logger.error("Unable to fetch public IP. The error was $s", error);
    return ""; // In caso di errore, ritorna una stringa vuota
  }
};

export { logger, getPublicIp };
