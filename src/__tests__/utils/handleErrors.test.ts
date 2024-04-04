import { describe, expect, it, vi } from "vitest";
import { handleErrors } from "../../utils/utils";
import dnsRecordError from "../__mocks__/responses/dnsRecordError.json";

describe("Test external utils", () => {
  it("Can handle errors from create record", () => {
    expect(handleErrors(dnsRecordError)).toBe(
      "Cannot create record. Record already exists.",
    );
  });
});
