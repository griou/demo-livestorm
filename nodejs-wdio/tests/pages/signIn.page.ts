import Page from "./page";
import SignInComponent from "./components/signInForm.comp";
import { User } from "../types/user";

const SCREEN_SELECTOR = "h2.intro-title"; // Nice seeing you again

class SignInPage extends Page {
  constructor() {
    super(SCREEN_SELECTOR);
  }

  public visit(): void {
    super.visit("https://app.livestorm.co/#/login");
  }

  public getTitle(): string {
    return $(this.screen_selector).getText();
  }

  public signIn(user: User): void {
    SignInComponent.signIn(user);
  }

  public isSignedIn(): boolean {
    return SignInComponent.isSignedIn();
  }

  public signInAndReturnFieldsError(user: User): Array<String> {
    return SignInComponent.signInAndReturnFieldsError(user);
  }

  public signInAndReturnFormError(user: User): string {
    return SignInComponent.signInAndReturnFormError(user);
  }
}

export default new SignInPage();
