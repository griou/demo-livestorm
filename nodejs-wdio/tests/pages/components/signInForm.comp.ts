import Page from "../page";
import { User } from "../../types/user";

class SignInComponent extends Page {
  constructor() {
    super("");
  }
  protected get loginField() {
    return $("[placeholder='you@example.com']");
  }

  protected get pwdField() {
    return $("[placeholder='Enter password']");
  }

  protected get submitButton() {
    return $(".submit-button");
  }

  protected get fieldErrors() {
    return $$(".base-form-error");
  }

  protected get formError() {
    return $(".form-error-message");
  }

  public signIn(user: User): void {
    this.allureReporter.startStep("Sign In");
    this.setEmail(user.userEmail);
    this.setPassword(user.userPwd);
    this.submit();
    this.allureReporter.endStep();
  }

  public isSignedIn(): boolean {
    return false;
  }

  public signInAndReturnFieldsError(user: User): Array<String> {
    this.signIn(user);
    this.allureReporter.startStep("Get Fields Error Messages");
    browser.waitUntil(() => this.fieldErrors.some((e) => e.isDisplayed()));
    var errorMessages = this.fieldErrors.reduce<string[]>(function (
      filtered,
      e
    ) {
      if (e.isDisplayed()) filtered.push(e.getText());
      return filtered;
    },
    []);
    this.allureReporter.endStep();
    return errorMessages;
  }

  public signInAndReturnFormError(user: User): string {
    this.signIn(user);
    this.allureReporter.startStep("Get Form Error Message");
    browser.waitUntil(() => this.formError.isDisplayed() === true);
    const errorMessage = this.formError.getText();
    this.allureReporter.endStep();
    return errorMessage;
  }

  private setEmail(email: string): void {
    this.allureReporter.startStep("Set Email");
    this.loginField.setValue(email);
    this.allureReporter.endStep();
  }

  private setPassword(password: string): void {
    this.allureReporter.startStep("Set Password");
    this.pwdField.setValue(password);
    this.allureReporter.endStep();
  }

  private submit(): void {
    this.allureReporter.startStep("Submit");
    this.submitButton.click();
    this.allureReporter.endStep();
  }
}

export default new SignInComponent();
