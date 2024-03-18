import { getPublicIp } from "../../utils/utils";

describe("Test external utils", () => {
  it("Can return a public IP", async () => {
    const expectedResult = "1.2.3.4";
    const result = await getPublicIp();
    expect(result).toBe(expectedResult);
  });
});
