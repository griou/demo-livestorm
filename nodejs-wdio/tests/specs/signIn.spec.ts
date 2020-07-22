import SignInPage from "../pages/signIn.page";
import { expect } from "chai";

describe("Sign In Page Failures", () => {
  it("should display error when email has invalid format", () => {
    SignInPage.visit();
    const errorMsg = SignInPage.signInAndReturnFieldsError({
      userEmail: "guillaume@livestorm",
      userPwd: "",
    });
    expect(errorMsg[0]).to.be.equal("This value should be a valid email.");
  });

  it("should display error when password is too short", () => {
    SignInPage.visit();
    const errorMsg = SignInPage.signInAndReturnFieldsError({
      userEmail: "guillaume@livestorm.co",
      userPwd: "1234",
    });
    expect(errorMsg[1]).to.be.equal(
      "This value is too short. It should have 8 characters or more."
    );
  });

  it("should display error when account is unknown", () => {
    SignInPage.visit();
    const errorMsg = SignInPage.signInAndReturnFormError({
      userEmail: "aezfefzfze@livestorm.co",
      userPwd: "12345678",
    });
    expect(errorMsg).to.contain(
      "There is no Livestorm account associated with the email"
    );
  });
});
