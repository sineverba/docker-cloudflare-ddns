import { describe, expect, it, vi } from "vitest";
import { getSubdomain } from "../../utils/utils";
import dnsRecords from "../__mocks__/responses/dnsRecords.json";

describe("Test external utils", () => {
  it("Can return a subdomain from a list of dns records", () => {
    const expectedResult = {
      id: "KuWKAaa71GZqUFedummZ4YIHapdivFQx",
      type: "A",
      name: "subdomain.example.com",
      content: "1.2.3.4",
    };
    expect(
      getSubdomain(
        dnsRecords.result,
        process.env.ZONE as string,
        process.env.SUBDOMAIN as string,
      ),
    ).toStrictEqual(expectedResult);
  });

  it("Can return a subdomain from a list of dns records if subdomain is equals to root zone", () => {
    vi.stubEnv("SUBDOMAIN", process.env.ZONE as string);
    const expectedResult = {
      id: "9HmTfQl7axVIlMQjONN2gH2KBTxP4RyQ",
      type: "A",
      name: "example.com",
      content: "1.2.3.4",
    };
    expect(
      getSubdomain(
        dnsRecords.result,
        process.env.ZONE as string,
        process.env.SUBDOMAIN as string,
      ),
    ).toStrictEqual(expectedResult);
  });
});
