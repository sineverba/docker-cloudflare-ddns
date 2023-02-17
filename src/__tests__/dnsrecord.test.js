import App from "../App.js";
import { items as dnsRecords } from "../mocks/responses/dnsRecords.js";

describe("Test DNS RECORD", () => {
  it("Test can create dns record", async () => {
    const app = new App();
    const record = { content: "1.2.3.4", type: "A", name: "subdomains" };
    const data = await app.createRecord("abcde123456", record);
    expect(data).toStrictEqual(record);
  });

  it("Test can update dns record", async () => {
    const app = new App();
    const record = { content: "1.2.3.4", type: "A", name: "subdomains" };
    const data = await app.updateRecord("abcde123456", "9876qwerty", record);
    expect(data).toStrictEqual(record);
  });

  it("Test browse dnsRecords return dnsRecords", async () => {
    const app = new App();
    const data = await app.browseDNSRecords("abcde123456");
    expect(data).toStrictEqual(dnsRecords);
  });
});
