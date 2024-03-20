/**
 * File to collect some utilities
 */
import winston from "winston";
import { publicIpv4 } from "public-ip";
import dotenvFlow from "dotenv-flow";

// Start env file
dotenvFlow.config();

/**
 * Format log message for Winston
 */
const formatLogMessage = (
  logMessage: winston.Logform.TransformableInfo,
): string =>
  `${logMessage.timestamp} - ${logMessage.level.toUpperCase()} - ${logMessage.message}`;

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
    winston.format.printf(formatLogMessage),
  ),
  defaultMeta: { service: "docker-cloudflare-ddns" },
  transports: [
    new winston.transports.Stream({
      stream: process.stderr,
      level: /* istanbul ignore next */ process.env.LOG_LEVEL ?? "debug",
    }),
  ],
});

const getPublicIp = async (): Promise<string> => {
  try {
    return await publicIpv4();
  } catch (error) /* istanbul ignore next */ {
    logger.error("Unable to fetch public IP. The error was $s", error);
    return ""; // In caso di errore, ritorna una stringa vuota
  }
};

export { formatLogMessage, logger, getPublicIp };
