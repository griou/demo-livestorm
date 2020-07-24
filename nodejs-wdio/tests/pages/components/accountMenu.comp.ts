import Page from "../page";
import { User } from "../../types/user";

class AccountMenuComponent extends Page {
  protected get accountMenuButton() {
    return $("#account-menu-button");
  }
  protected get logoutButton() {
    return $("#logout-button");
  }
  constructor() {
    super("");
  }

  public signOut(): void {
    this.allureReporter.startStep("Sign out");
    this.accountMenuButton.waitForClickable();
    this.accountMenuButton.click();
    this.logoutButton.waitForClickable();
    this.logoutButton.click();
    this.allureReporter.endStep();
  }
}

export default new AccountMenuComponent();
