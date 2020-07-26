import SignInPage from "../pages/signIn.page";
import WebinarsPage from "../pages/webinars.page";
import { expect } from "chai";
const fs = require("fs");

describe("Sign In Failures", function () {
  before(function () {
    const file = fs.readFileSync("../fixtures/users.fixture.json");
    this.users = JSON.parse(file);
    SignInPage.visit();
  });
  afterEach(function () {
    browser.refresh();
  });

  it("should not be signed in with invalid password", function () {
    SignInPage.signIn(this.users["incorrectPassword"]);
    expect(SignInPage.isSignedIn(), "User should not be signed in").to.be.false;
  });

  it("should redirect to login page in case of sign in failure on server side", function () {
    SignInPage.signIn(this.users["incorrectPassword"]);
    expect(
      () => SignInPage.waitForDisplayed(),
      "Sign in page should be displayed"
    ).to.not.throw();
  });
});

describe("Sign In Fields Errors", function () {
  before(function () {
    const file = fs.readFileSync("../fixtures/users.fixture.json");
    this.users = JSON.parse(file);
    SignInPage.visit();
  });
  afterEach(function () {
    browser.refresh();
  });

  it("empty email should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError(
      this.users["emptyEmail"]
    );
    expect(errorMsg[0], "Invalid email field error message").to.equal(
      "This value is required."
    );
  });

  it("email with invalid format should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError(
      this.users["invalidEmail"]
    );
    expect(errorMsg[0], "Invalid email field error message").to.equal(
      "This value should be a valid email."
    );
  });

  it("empty password should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError(
      this.users["emptyPassword"]
    );
    expect(errorMsg[0], "Invalid password field error message").to.equal(
      "This value is required."
    );
  });

  it("password too short should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError(
      this.users["tooShortPassword"]
    );
    expect(errorMsg[0], "Invalid password field error message").to.equal(
      "This value is too short. It should have 8 characters or more."
    );
  });

  it("each invalid field should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFieldsError(
      this.users["invalidFields"]
    );
    expect(errorMsg.length, "Missing field error message").to.equal(2);
  });
});

describe("Sign In Form Errors", function () {
  before(function () {
    const file = fs.readFileSync("../fixtures/users.fixture.json");
    this.users = JSON.parse(file);
    SignInPage.visit();
  });
  afterEach(function () {
    browser.refresh();
  });

  it("incorrect password should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFormError(
      this.users["incorrectPassword"]
    );
    expect(errorMsg, "Invalid form error message").to.be.equal(
      "Invalid login credentials. Please try again."
    );
  });

  it("unknown email should return an error", function () {
    const errorMsg = SignInPage.signInAndReturnFormError(
      this.users["unknownEmail"]
    );
    expect(errorMsg, "Invalid form error message").to.equal(
      `There is no Livestorm account associated with the email ${this.users["unknownEmail"]["userEmail"]}`
    );
  });
});
