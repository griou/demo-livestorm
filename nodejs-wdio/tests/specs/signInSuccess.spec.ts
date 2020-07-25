import SignInPage from "../pages/signIn.page";
import WebinarsPage from "../pages/webinars.page";
import { expect } from "chai";
const fs = require("fs");

describe("Sign In Success", function () {
  before(function () {
    const file = fs.readFileSync("../fixtures/users.fixture.json");
    this.users = JSON.parse(file);
  });
  beforeEach(function () {
    SignInPage.visit();
    SignInPage.signIn(this.users["validUser"]);
  });
  afterEach(function () {
    // TO DO: add helper to logout with a http request
    WebinarsPage.signOut();
  });
  it("should be signed in", function () {
    expect(WebinarsPage.isSignedIn(), "User shoud be signed in").to.be.true;
  });
  it("should be redirect to Webinars page", function () {
    expect(
      () => WebinarsPage.waitForDisplayed(),
      "Webinars page should be displayed"
    ).not.to.throw();
  });
});
