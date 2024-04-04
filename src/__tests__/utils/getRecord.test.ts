import { describe, expect, it, vi } from "vitest";
import { getRecord } from "../../utils/utils";

describe("Test external utils", () => {
  it("Can return a record object with subdomain", () => {
    const expectedResult = {
      content: "1.2.3.4",
      type: "A",
      name: "subdomain",
      proxied: true,
    };
    expect(getRecord("1.2.3.4")).toStrictEqual(expectedResult);
  });

  it("Can return a record object with @ as root, if no subdomain is provided", () => {
    vi.stubEnv("SUBDOMAIN", "");
    const expectedResult = {
      content: "1.2.3.4",
      type: "A",
      name: "@",
      proxied: true,
    };
    expect(getRecord("1.2.3.4")).toStrictEqual(expectedResult);
  });

  it("Can return a record object with subdomain and proxy as false", () => {
    vi.stubEnv("SUBDOMAIN", "subdomain");
    vi.stubEnv("PROXIED", "false");
    const expectedResult = {
      content: "1.2.3.4",
      type: "A",
      name: "subdomain",
      proxied: false,
    };
    expect(getRecord("1.2.3.4")).toStrictEqual(expectedResult);
  });
});
