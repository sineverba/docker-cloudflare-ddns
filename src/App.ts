import Cloudflare from "cloudflare";
import { APIPromise, PagePromise } from "cloudflare/core.mjs";
import {
  DNSRecord,
  DNSRecordsV4PagePaginationArray,
} from "cloudflare/resources/dns/records.mjs";
import {
  Zone,
  ZonesV4PagePaginationArray,
} from "cloudflare/resources/index.mjs";
import { IRecord } from "./utils/utils.js";

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

  /**
   * Fetch the DNS Records for a zone (domain name) ID
   */
  getDnsRecords = (
    zoneId: string,
  ): PagePromise<DNSRecordsV4PagePaginationArray, DNSRecord> =>
    this.cf().dns.records.list({ zone_id: zoneId });

  addRecord = (
    zoneId: string,
    record: IRecord,
  ): APIPromise<Cloudflare.DNS.Records.DNSRecord> =>
    this.cf().dns.records.create({
      zone_id: zoneId,
      content: record.content,
      name: record.name,
      type: "A",
      proxied: record.proxied,
    });
}
