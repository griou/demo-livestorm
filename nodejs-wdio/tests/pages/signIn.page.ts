import Page from "./page";
import WebinarsPage from "./webinars.page";
import SignInComponent from "./components/signInForm.comp";
import isSignedIn from "../helpers/signIn.helper";
import { User } from "../types/user";

const SCREEN_SELECTOR = "h2.intro-title"; // Nice seeing you again

class SignInPage extends Page {
  constructor() {
    super(SCREEN_SELECTOR);
  }

  public visit(): void {
    // TODO: refactor to make login dynamic
    super.visit("/#/login");
  }

  public signIn(user: User): typeof WebinarsPage {
    SignInComponent.signIn(user);
    return WebinarsPage;
  }

  public isSignedIn(signIn = true): boolean {
    return isSignedIn(signIn);
  }

  public signInAndReturnFieldsError(user: User): Array<String> {
    return SignInComponent.signInAndReturnFieldsError(user);
  }

  public signInAndReturnFormError(user: User): string {
    return SignInComponent.signInAndReturnFormError(user);
  }
}

export default new SignInPage();
