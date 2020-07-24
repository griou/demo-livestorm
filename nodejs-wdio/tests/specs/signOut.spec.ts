import SignInPage from "../pages/signIn.page";
import { expect } from "chai";
const fs = require("fs");

describe("Sign Out Success", function () {
  before(function () {
    const file = fs.readFileSync("../fixtures/users.fixture.json");
    this.users = JSON.parse(file);
  });
  beforeEach(function () {
    // TO DO: refactor with a http post request
    SignInPage.visit();
    this.webinarsPage = SignInPage.signIn(this.users["validUser"]);
  });
  it("should destroy session", function () {
    this.webinarsPage.signOut();
    expect(SignInPage.isSignedIn(false), "Session should be destroyed").to.be
      .false;
  });
  it("should redirect to sign in page", function () {
    this.webinarsPage.signOut();
    expect(
      () => SignInPage.waitForDisplayed(),
      "Sign in page should be displayed"
    ).not.to.throw();
  });
});
