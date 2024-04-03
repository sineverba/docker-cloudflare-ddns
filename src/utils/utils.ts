/**
 * File to collect some utilities
 */
import winston from "winston";
import { publicIpv4 } from "public-ip";
import dotenvFlow from "dotenv-flow";
import { DNSRecord } from "cloudflare/resources/dns/records.mjs";
import { getBoolean } from "@sineverba/getboolean";

// Start env file
dotenvFlow.config();

/**
 * Calculates the log level based on the environment variable or defaults to "debug".
 * @returns The log level as a string.
 */
const getLogLevel = (): string => {
  /**
   * If the environment variable LOG_LEVEL is not set or is an empty string,
   * default to "debug".
   */
  if (!process.env.LOG_LEVEL || process.env.LOG_LEVEL === "") {
    return "debug";
  }
  /**
   * Otherwise, return the log level specified in the environment variable.
   */
  return process.env.LOG_LEVEL;
};

/**
 * Formats log messages for Winston.
 * @param logMessage The log message object containing information such as timestamp, level, and message.
 * @returns The formatted log message string.
 */
const formatLogMessage = (
  logMessage: winston.Logform.TransformableInfo,
): string =>
  `${logMessage.timestamp} - ${logMessage.level.toUpperCase()} - ${logMessage.message}`;

/**
 * Create a logger instance to be used throughout the project.
 */
const logger: winston.Logger = winston.createLogger({
  /**
   * Specifies the minimum level of messages to log.
   */
  level: "info",

  /**
   * Specifies the format of the log messages.
   */
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    /**
     * The log message format template.
     * @param {Object} log The log message object.
     * @param {string} log.message The log message.
     * @param {string} log.level The log level (e.g., 'info', 'error').
     * @param {string} log.service The name of the service.
     * @param {string} log.timestamp The timestamp of the log message.
     * @returns {string} The formatted log message.
     */
    winston.format.printf(formatLogMessage),
  ),

  /**
   * Specifies the default metadata to be included with log messages.
   */
  defaultMeta: { service: "docker-cloudflare-ddns" },

  /**
   * Specifies the transports (outputs) where log messages should be sent.
   */
  transports: [
    new winston.transports.Stream({
      /**
       * The output stream where log messages are written.
       */
      stream: process.stderr,

      /**
       * Specifies the minimum level of messages to log for this transport.
       */
      level: getLogLevel(),

      /**
       * Specifies whether this transport should be silent (i.e., not produce any output).
       */
      silent: process.env.NODE_ENV === "test",
    }),
  ],
});

/**
 * Retrieves the public IP address asynchronously.
 * @returns A Promise that resolves to a string representing the public IP address.
 *          If fetching the public IP fails, an empty string is returned.
 */
const getPublicIp = async (): Promise<string> => {
  try {
    return await publicIpv4();
  } catch (error) {
    /**
     * Logs an error message if fetching the public IP fails.
     * @param error The error object thrown during the process of fetching the public IP.
     */
    logger.error("Unable to fetch public IP. The error was %s", error);
    return ""; // In case of an error, return an empty string
  }
};

/**
 * Represents a subdomain DNS record.
 */
interface ISubdomain {
  /**
   * The unique identifier of the DNS record.
   */
  id: string;

  /**
   * The type of DNS record (e.g., A, CNAME, MX).
   */
  type: string;

  /**
   * The name of the DNS record.
   */
  name: string;

  /**
   * The content associated with the DNS record.
   */
  content: string;
}

/**
 * Retrieves the subdomain DNS record from the provided DNS records based on the domain and subdomain.
 * @param dnsRecords An array of DNS records.
 * @param domain The domain name.
 * @param subdomain The subdomain name.
 * @returns The subdomain DNS record matching the provided domain and subdomain.
 */
const getSubdomain = (
  dnsRecords: DNSRecord[],
  domain: string,
  subdomain: string,
): ISubdomain | undefined => {
  /**
   * If subdomain is equal to domain, we are looking for
   * root zone.
   * Else, we concatenate.
   */
  const filter = domain === subdomain ? domain : `${subdomain}.${domain}`;

  return dnsRecords
    .filter((dns: DNSRecord) => dns.name === filter)
    .map((record: any) => ({
      id: record.id,
      type: record.type,
      name: record.name,
      content: record.content,
    }))[0];
};

/**
 * Represents a DNS record with content, type, name, and proxied status.
 */
interface IRecord {
  /** The content of the DNS record, typically a public IP address. */
  content: string;

  /** The type of DNS record, which is always "A" for this interface. */
  type: string;

  /** The name of the DNS record, which can be a subdomain or the root domain. */
  name: string;

  /**
   * A boolean value indicating whether the DNS record is proxied through a CDN (Content Delivery Network).
   * `true` if the record is proxied, `false` otherwise.
   */
  proxied: boolean;
}

/**
 * Retrieves DNS record information based on the provided public IP address.
 * @param publicIp The public IP address to be used as the DNS record content.
 * @returns An object representing the DNS record with content, type, name, and proxied status.
 */
const getRecord = (publicIp: string): IRecord => {
  // Determine the name of the DNS record based on the presence of a subdomain in the environment variables.
  const name =
    process.env.SUBDOMAIN && process.env.SUBDOMAIN !== ""
      ? process.env.SUBDOMAIN
      : "@";

  // Extract the proxied status from the environment variables and convert it to a boolean value.
  const proxied = getBoolean(process.env.PROXIED);

  // Construct and return the DNS record object.
  return {
    content: publicIp,
    type: "A",
    name: name,
    proxied: proxied,
  };
};

export {
  getLogLevel,
  formatLogMessage,
  logger,
  getPublicIp,
  getSubdomain,
  getRecord,
  IRecord,
};
