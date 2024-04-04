import { describe, expect, it, vi } from "vitest";
import { getPublicIp } from "../../utils/utils";
import { publicIpv4 } from "public-ip";

/**
 * Mock the external library
 */

vi.mock("public-ip");

describe("Test external utils", () => {
  it("Can return a public IP", async () => {
    const expectedResult = "1.2.3.4";
    vi.mocked(publicIpv4).mockResolvedValue(expectedResult);
    const result = await getPublicIp();
    expect(result).toBe(expectedResult);
  });
  it("Can handles error when fetching public IP", async () => {
    const expectedResult = "";
    vi.mocked(publicIpv4).mockRejectedValue(
      new Error("Failed to fetch public IP. Error thrown from Vitest"),
    );
    const result = await getPublicIp();
    expect(result).toBe(expectedResult);
  });
});
