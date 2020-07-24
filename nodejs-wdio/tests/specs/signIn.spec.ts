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

describe("Sign In Errors", function () {
  before(function () {
    SignInPage.visit();
  });
  afterEach(function () {
    browser.refresh();
  });

  it("should not be signed in with invalid password", function () {
    SignInPage.signIn({
      userEmail: "guillaume@livestorm.co",
      userPwd: "12345678",
    });
    expect(SignInPage.isSignedIn(), "User should not be signed in").to.be.false;
  });

  it("should redirect to login page in case of sign in failure on server side", function () {
    SignInPage.signIn({
      userEmail: "guillaume@livestorm.co",
      userPwd: "12345678",
    });
    expect(
      () => SignInPage.waitForDisplayed(),
      "Sign in page should be displayed"
    ).to.not.throw();
  });

  it("empty email should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError({
      userEmail: "",
      userPwd: "12345678",
    });
    expect(errorMsg[0], "Invalid email field error message").to.equal(
      "This value is required."
    );
  });

  it("email with invalid format should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError({
      userEmail: "guillaume@livestorm",
      userPwd: "12345678",
    });
    expect(errorMsg[0], "Invalid email field error message").to.equal(
      "This value should be a valid email."
    );
  });

  it("empty password should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError({
      userEmail: "guillaume@livestorm.co",
      userPwd: "",
    });
    expect(errorMsg[1], "Invalid password field error message").to.equal(
      "This value is required."
    );
  });

  it("password too short should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError({
      userEmail: "guillaume@livestorm.co",
      userPwd: "1234567",
    });
    expect(errorMsg[1], "Invalid password field error message").to.equal(
      "This value is too short. It should have 8 characters or more."
    );
  });

  it("incorrect password should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFormError({
      userEmail: "guillaume@livestorm.co",
      userPwd: "12345678",
    });
    expect(errorMsg, "Invalid form error message").to.be.equal(
      "Invalid login credentials. Please try again."
    );
  });

  it("unknown email should return an error", function () {
    const email = "aezfefzfze@livestorm.co";
    const errorMsg = SignInPage.signInAndReturnFormError({
      userEmail: email,
      userPwd: "12345678",
    });
    expect(errorMsg, "Invalid form error message").to.equal(
      `There is no Livestorm account associated with the email ${email}`
    );
  });
});
