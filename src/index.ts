import dotenvFlow from "dotenv-flow";
import App from "./App.js";
import { getPublicIp, logger } from "./utils/utils.js";

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
}

initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
