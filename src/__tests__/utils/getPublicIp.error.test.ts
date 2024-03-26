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
      publicIpv4: vi.fn(() => {
        throw new Error("Failed to fetch public IP. Error thrown from Vitest");
      }),
    };
  }
  return {
    publicIpv4: vi.fn(() => {
      throw new Error("Failed to fetch public IP. Error thrown from Vitest");
    }),
  };
});

describe("Test external utils", () => {
  it("Can handles error when fetching public IP", async () => {
    const expectedResult = "";
    const result = await getPublicIp();
    expect(result).toBe(expectedResult);
  });
});
