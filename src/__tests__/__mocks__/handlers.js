import { HttpResponse, http } from "msw";
import zones from "../__mocks__/responses/zones.json";
import dnsRecords from "../__mocks__/responses/dnsRecords.json";
import dnsRecord from "../__mocks__/responses/dnsRecord.json";
import dnsRecordUpdate from "../__mocks__/responses/dnsRecordUpdate.json";

export const handlers = [
  http.get("https://api.cloudflare.com/client/v4/zones", () =>
    HttpResponse.json(zones),
  ),
  http.get(
    "https://api.cloudflare.com/client/v4/zones/:zoneId/dns_records",
    () => HttpResponse.json(dnsRecords),
  ),
  // Create a new record
  http.post(
    "https://api.cloudflare.com/client/v4/zones/:zoneId/dns_records",
    () => HttpResponse.json(dnsRecord),
  ),
  // Update a record
  http.patch(
    "https://api.cloudflare.com/client/v4/zones/:zoneId/dns_records/:dnsRecordId",
    () => HttpResponse.json(dnsRecordUpdate),
  ),
];
