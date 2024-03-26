import { describe, expect, it, vi } from "vitest";
import { getLogLevel } from "../../utils/utils";

describe("Test external utils", () => {
  it("Can return debug if no process.env is specified", () => {
    vi.stubEnv("LOG_LEVEL", "");
    expect(getLogLevel()).toBe("debug");
  });

  it("Can return log level specified by process.env", () => {
    vi.stubEnv("LOG_LEVEL", "info");
    expect(getLogLevel()).toBe("info");
  });
});
