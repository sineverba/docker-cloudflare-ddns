import App from "../App.js";
import { items as dnsRecords } from "../mocks/responses/dnsRecords.js";
import { items as zones } from "../mocks/responses/zones.js";

describe("Test Cloudflare class support", () => {
  it("Test can get token from file .env", () => {
    const app = new App();
    expect(app.getToken()).toBe("abcde12345");
  });

  it("Test can extract id from zones list", () => {
    const app = new App();
    expect(app.getZoneId(zones.result, "example.com")).toBe(
      "023e105f4ecef8ad9ca31a8372d0c353"
    );
    expect(app.getZoneId(zones.result, "example.it")).toBe(
      "thisistheidofexampleit"
    );
    expect(app.getZoneId(zones.result, "example.net")).toBe(
      "anotheronebutfornet"
    );
  });

  it("Test can extract subdomain record from dns records list", () => {
    const app = new App();
    const expectedSubDomain = {
      id: "58787879487569e0b59",
      type: "A",
      name: "subdomain.example.com",
      content: "192.168.1.1",
    };
    expect(
      app.getSubdomain(dnsRecords.result, "example.com", "subdomain")
    ).toStrictEqual(expectedSubDomain);
  });

  it("Test can return true if public ip is different from IP stored in cloudflare", () => {
    const app = new App();
    const subdomain = {
      id: "58787879487569e0b59",
      type: "A",
      name: "subdomain.example.com",
      content: "192.168.1.1",
    };
    expect(app.isIpDifferent("10.20.30.40", subdomain)).toBeTruthy();
  });

  it("Test can return false if public ip is NOT different from IP stored in cloudflare", () => {
    const app = new App();
    const subdomain = {
      id: "58787879487569e0b59",
      type: "A",
      name: "subdomain.example.com",
      content: "192.168.1.1",
    };
    expect(app.isIpDifferent("192.168.1.1", subdomain)).toBeFalsy();
  });

  it("Test can extract zone root record from dns records list if subdomain is missing", () => {
    const app = new App();
    const expectedSubDomain = {
      id: "372e67954025e0ba6aaa6d586b9e0b59",
      type: "A",
      name: "example.com",
      content: "198.51.100.4",
    };
    expect(
      app.getSubdomain(dnsRecords.result, "example.com", "example.com")
    ).toStrictEqual(expectedSubDomain);
  });
});
