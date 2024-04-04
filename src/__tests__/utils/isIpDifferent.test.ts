import { describe, expect, it, vi } from "vitest";
import { isIpDifferent } from "../../utils/utils";
import dnsRecords from "../__mocks__/responses/dnsRecords.json";

describe("Test external utils", () => {
  it("Can return true if current public IP is different from that stored in subdomain", () => {
    const currentPublicIp = "10.20.30.40";
    const dnsRecord = dnsRecords.result.filter(
      (dnsRecord) =>
        dnsRecord.name === `${process.env.SUBDOMAIN}.${process.env.ZONE}`,
    )[0];
    expect(isIpDifferent(currentPublicIp, dnsRecord)).toBe(true);
  });

  it("Can return false if current public IP is same from that stored in subdomain", () => {
    const currentPublicIp = "1.2.3.4";
    const dnsRecord = dnsRecords.result.filter(
      (dnsRecord) =>
        dnsRecord.name === `${process.env.SUBDOMAIN}.${process.env.ZONE}`,
    )[0];
    expect(isIpDifferent(currentPublicIp, dnsRecord)).toBe(false);
  });
});
