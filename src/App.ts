export default class App {
  private token: string | undefined;

  /**
   * Sets the application's token.
   * @param {string} token The token to set.
   */
  public setToken(token: string): void {
    this.token = token;
  }

  /**
   * Gets the application's token.
   * @returns {string | undefined} The application's token, or undefined if it has not been set.
   */
  public getToken(): string | undefined {
    return this.token;
  }
}
