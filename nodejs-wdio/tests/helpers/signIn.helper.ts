export default function isSignedIn(signIn = true): boolean {
  try {
    const expectedLength = signIn ? 1 : 0;
    browser.waitUntil(
      () =>
        browser.getCookies().filter((cookie) => cookie.name === "refresh_token")
          .length === expectedLength,
      {
        timeout: 2000,
      }
    );
    return signIn;
  } catch (error) {
    return !signIn;
  }
}
