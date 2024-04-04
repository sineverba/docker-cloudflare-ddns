import { describe, expect, it } from "vitest";
import { formatLogMessage } from "../../utils/utils";

describe("Test external utils", () => {
  it("Can format the log message", () => {
    const data = {
      message: "App started!",
      level: "info",
      service: "docker-cloudflare-ddns",
      timestamp: "2024-03-20 12:27:05",
    };
    const expectedResult = "2024-03-20 12:27:05 - INFO - App started!";
    expect(formatLogMessage(data)).toBe(expectedResult);
  });
});
