import Page from "../page";
import { User } from "../../types/user";

class AccountMenuComponent extends Page {
  protected get accountMenuButton() {
    return $("#account-menu-button");
  }
  protected get logoutButton() {
    return $("#logout-button");
  }

  protected get menuItems() {
    return $(".menu-items");
  }

  constructor() {
    super("");
  }

  public signOut(): void {
    this.allureReporter.startStep("Sign out");
    this.openMenu();
    this.clickLogout();
    this.allureReporter.endStep();
  }

  private openMenu():void {
    this.allureReporter.startStep("Open menu");
    browser.waitUntil(() => this.accountMenuButton.isDisplayed());
    this.accountMenuButton.click();
    browser.waitUntil(() => this.menuItems.isDisplayed());
    this.allureReporter.endStep();
  }

  private clickLogout(): void {
    this.allureReporter.startStep("Click Logout");
    browser.waitUntil(() => this.logoutButton.isDisplayed());
    this.logoutButton.click();
    this.allureReporter.endStep();
  }
}

export default new AccountMenuComponent();
