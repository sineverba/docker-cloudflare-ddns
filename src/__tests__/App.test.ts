import App from "../App";

describe("Test APP", () => {
  it("Can set and get the token", () => {
    const app = new App();
    app.setToken("a1b2c3");
    expect(app.getToken()).toBe("a1b2c3");
  });
});
