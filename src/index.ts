/**
 * This file serves as the entry point for the application.
 * It initializes the application, retrieves necessary configurations,
 * and manages DNS records based on certain conditions.
 */

import dotenvFlow from "dotenv-flow";
import App from "./App.js";
import {
  getPublicIp,
  getRecord,
  getSubdomain,
  handleErrors,
  isIpDifferent,
  logger,
} from "./utils/utils.js";

/**
 * Initializes the application by setting up configurations and managing DNS records.
 */
async function initializeApp() {
  logger.info("App started!");

  // Initialize dot-env
  dotenvFlow.config();
  // Instantiate the application
  const app = new App();

  /**
   * Set the Cloudflare token from environment variables.
   * Exits the application if the token is not defined.
   */
  if (process.env.CF_TOKEN === undefined) {
    logger.error(
      "CF_TOKEN is undefined. Unable to continue. Exiting application.",
    );
    process.exit(1);
  }
  if (process.env.ZONE === undefined) {
    logger.error("ZONE is undefined. Unable to continue. Exiting application.");
    process.exit(1);
  }
  app.setToken(process.env.CF_TOKEN);

  /**
   * Step 1: Get the public IP address.
   */
  const currentPublicIp = await getPublicIp();
  logger.debug("Got public IP as %s", currentPublicIp);

  /**
   * Step 2: Get the main ID of the zone.
   * Zone refers to the domain name, second level.
   * Example: "example.com" is a zone.
   */
  const zoneId = await app
    .browseZones(process.env.ZONE)
    .then((data) => data.result[0].id);
  logger.debug("Got zoneId as %s", zoneId);

  /**
   * Step 3: Get the DNS records associated with the zone.
   */
  const dnsRecords = await app.getDnsRecords(zoneId);
  logger.debug("Got %s DNS records", dnsRecords.getPaginatedItems().length);
  if (dnsRecords.getPaginatedItems().length > 0) {
    dnsRecords
      .getPaginatedItems()
      .map((dnsRecord, index) =>
        logger.debug("%sth DNS record is %s", index + 1, dnsRecord),
      );
  }

  /**
   * Step 4: Filter DNS records by subdomain.
   * If SUBDOMAIN is not defined, defaults to ZONE.
   */
  const subdomain = getSubdomain(
    dnsRecords.getPaginatedItems(),
    process.env.ZONE,
    process.env.SUBDOMAIN ?? process.env.ZONE,
  );
  logger.debug("Filtered subdomain as %s", subdomain);

  /**
   * If subdomain is undefined, a new record needs to be created.
   */
  if (typeof subdomain === "undefined") {
    logger.info("Record is new. Attempting to create record");
    await app
      .addRecord(zoneId, getRecord(currentPublicIp))
      .then((data) => {
        logger.info("Record inserted successfully");
        logger.debug("Created record info: %s", data);
      })
      .catch((error) => logger.error(handleErrors(error)));
    // Exit!
    process.exit(1);
  }

  /**
   * If the public IP address is different from the current IP in DNS records,
   * the record needs to be updated.
   */
  if (isIpDifferent(currentPublicIp, subdomain)) {
    logger.info("IP is different, need to update the record");
    await app
      .updateRecord(zoneId, subdomain.id, getRecord(currentPublicIp))
      .then((data) => {
        logger.info("Record updated successfully");
        logger.debug("Updated record info: %s", data);
      })
      .catch((error) => logger.error("Record updated failed: %s", error));
    // Exit!
    process.exit(1);
  }

  logger.info("No need to update or create records");
}

// Call initializeApp() and handle any initialization errors.
initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
