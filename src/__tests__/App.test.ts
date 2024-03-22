import { describe, expect, it } from "vitest";
import App from "../App";

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
    expect(zones.result[0].id).toBe("23XhtvhnUu5YdKNeRzg3BQqjx1WwF666");
  });
});
