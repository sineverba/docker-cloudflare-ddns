import dotenvFlow from "dotenv-flow";
import App from "./App.js";
import {
  getPublicIp,
  getRecord,
  getSubdomain,
  handleErrors,
  logger,
} from "./utils/utils.js";

async function initializeApp() {
  logger.info("App started!");

  // Initialize dot-env
  dotenvFlow.config();
  // Instance the app
  const app = new App();
  /**
   * Set the token
   */
  if (process.env.CF_TOKEN === undefined) {
    logger.error(
      "CF_TOKEN is undefined. Unable to continue. Exit from application.",
    );
    process.exit(1);
  }
  if (process.env.ZONE === undefined) {
    logger.error(
      "ZONE is undefined. Unable to continue. Exit from application.",
    );
    process.exit(1);
  }
  app.setToken(process.env.CF_TOKEN);
  /**
   * 1. Get public IP
   */
  const currentPublicIp = await getPublicIp();
  logger.debug("Got public IP as %s", currentPublicIp);
  /**
   * 2. Get the main ID of the zone.
   * Zone is domain name, second level.
   *
   * E.g.: "example.com" is a zone.
   */
  const zoneId = await app
    .browseZones(process.env.ZONE)
    .then((data) => data.result[0].id);
  logger.debug("Got zoneId as %s", zoneId);
  /**
   * 3. Get the DNS records
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
   * 4. Filter by subdomain
   */
  const subdomain = getSubdomain(
    dnsRecords.getPaginatedItems(),
    process.env.ZONE,
    process.env.SUBDOMAIN ?? process.env.ZONE,
  );
  logger.debug("Filtered subdomain as %s", subdomain);

  /**
   * If subdomain is undefined, we need to create record
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
}

initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
