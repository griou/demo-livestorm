import Page from "./page";
import SignInPage from "./signIn.page";
import AccountMenuComponent from "./components/accountMenu.comp";
import isSignedIn from "../helpers/signIn.helper";

const SCREEN_SELECTOR = "div.title"; // Nice seeing you again

class WebinarsPage extends Page {
  constructor() {
    super(SCREEN_SELECTOR);
  }

  public isSignedIn(signIn = true): boolean {
    return isSignedIn(signIn);
  }

  public signOut(): typeof SignInPage {
    AccountMenuComponent.signOut();
    return SignInPage;
  }
}

export default new WebinarsPage();
