import App from "../App.js";
import { items as zones } from "../mocks/responses/zones.js";

describe("Test ZONES", () => {
  it("Test browse zones return zones", async () => {
    const app = new App();
    const data = await app.browseZones();
    expect(data).toStrictEqual(zones);
  });
});
