import { describe, expect, it, vi } from "vitest";
import zones from "./__mocks__/responses/zones.json";
import dnsRecords from "./__mocks__/responses/dnsRecords.json";
import App from "../App";

const zoneId = zones.result[0].id;
const dnsRecordsId = dnsRecords.result[0].id;

describe("Test APP file", () => {
  it("Can set and get the token", () => {
    const app = new App();
    app.setToken("aFakeToken");
    expect(app.getToken()).toBe("aFakeToken");
  });

  it("Can browse a zone", async () => {
    const app = new App();
    app.setToken("aFakeToken");
    const zones = await app.browseZones(process.env.ZONE as string);
    expect(zones.result[0].id).toBe(zoneId);
  });

  it("Can get dns records", async () => {
    const app = new App();
    app.setToken("aFakeToken");
    const dns = await app.getDnsRecords(zoneId);
    expect(dns.result[0].id).toBe(dnsRecordsId);
  });

  it("Can add a new record", async () => {
    const app = new App();
    app.setToken("aFakeToken");
    const zoneId = zones.result[0].id;
    const record = {
      content: "1.2.3.4",
      type: "A",
      name: "newsubdomain",
      proxied: true,
    };
    const result = await app.addRecord(zoneId, record);
    expect(result.zone_id).toBe(zones.result[0].id);
  });

  it("Can update a record", async () => {
    vi.stubEnv("ZONE", "example.com");
    vi.stubEnv("SUBDOMAIN", "subdomain");
    const app = new App();
    app.setToken("aFakeToken");
    const zoneId = zones.result[0].id;
    const dnsRecord = dnsRecords.result.filter(
      (dnsRecord) =>
        dnsRecord.name === `${process.env.SUBDOMAIN}.${process.env.ZONE}`,
    )[0];
    const record = {
      content: "1.2.3.4",
      type: "A",
      name: "subdomain",
      proxied: true,
    };
    const result = await app.updateRecord(zoneId, dnsRecord.id, record);
    expect(result.id).toBe(dnsRecord.id);
  });
});
