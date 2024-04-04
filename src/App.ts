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
   * Browse zones based on the provided zone name.
   *
   * @param zone - The name of the zone to browse.
   * @returns A promise resolving to a page of zones matching the provided name.
   */
  browseZones = (zone: string): PagePromise<ZonesV4PagePaginationArray, Zone> =>
    this.cf().zones.list({ query: { name: zone } });

  /**
   * Retrieve DNS records for a specific zone.
   *
   * @param zoneId - The ID of the zone for which DNS records are to be retrieved.
   * @returns A promise resolving to a page of DNS records for the specified zone.
   */
  getDnsRecords = (
    zoneId: string,
  ): PagePromise<DNSRecordsV4PagePaginationArray, DNSRecord> =>
    this.cf().dns.records.list({ zone_id: zoneId });

  /**
   * Add a DNS record to a specific zone.
   *
   *
   * @param zoneId - The ID of the zone to which the DNS record will be added.
   * @param record - An object representing the DNS record to be added.
   * @returns A promise resolving to the added DNS record.
   * @see https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-create-dns-record
   */
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

  /**
   * Update a DNS record within a specific zone.
   *
   * @param {string} zoneId - The identifier of the zone where the DNS record resides.
   * @param {string} dnsRecordId - The identifier of the DNS record to be updated.
   * @param {IRecord} record - An object containing the updated information for the DNS record.
   * @returns {Promise<any>} A promise representing the outcome of the record update operation.
   * @see https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-patch-dns-record
   */
  updateRecord = (zoneId: string, dnsRecordId: string, record: IRecord): any =>
    this.cf().dns.records.edit(dnsRecordId, {
      zone_id: zoneId,
      content: record.content,
      name: record.name,
      type: "A",
      proxied: record.proxied,
    });
}
