import { describe, expect, it, vi } from "vitest";
import { getPublicIp } from "../../utils/utils";

/**
 * Mock the external library
 */
vi.mock("public-ip", async (importOriginal) => {
  const mod = await importOriginal();
  if (typeof mod === "object" && mod !== null) {
    return {
      ...mod,
      publicIpv4: vi.fn(() => "1.2.3.4"),
    };
  }
  return {
    publicIpv4: vi.fn(() => "1.2.3.4"),
  };
});

describe("Test external utils", () => {
  it("Can return a public IP", async () => {
    const expectedResult = "1.2.3.4";
    const result = await getPublicIp();
    expect(result).toBe(expectedResult);
  });
});
