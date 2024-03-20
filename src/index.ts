import dotenvFlow from "dotenv-flow";
import App from "./App.js";
import { logger } from "./logger.js";
import { getPublicIp } from "./utils/utils.js";

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
  app.setToken(process.env.CF_TOKEN);
  /**
   * 1. Get public IP
   */
  const currentPublicIp = await getPublicIp();
  logger.debug("Got public IP as %s", currentPublicIp);
}

initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
