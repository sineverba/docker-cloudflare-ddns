import Cloudflare from "cloudflare";
import { PagePromise } from "cloudflare/core.mjs";
import {
  Zone,
  ZonesV4PagePaginationArray,
} from "cloudflare/resources/index.mjs";

export default class App {
  private token: string | undefined;

  /**
   * Sets the application's token.
   * @param {string} token The token to set.
   */
  public setToken(token: string): void {
    this.token = token;
  }

  /**
   * Gets the application's token.
   * @returns {string | undefined} The application's token, or undefined if it has not been set.
   */
  public getToken(): string | undefined {
    return this.token;
  }

  /**
   * Initialize Cloudflare
   * @returns {Cloudflare} a Cloudflare instance
   */
  private cf(): Cloudflare {
    return new Cloudflare({ apiToken: this.getToken() });
  }

  /**
   * Browse the zones in Cloudflare
   */
  browseZones = (zone: string): PagePromise<ZonesV4PagePaginationArray, Zone> =>
    this.cf().zones.list({ query: { name: zone } });
}
