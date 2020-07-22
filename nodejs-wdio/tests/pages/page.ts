import allureReporter from "@wdio/allure-reporter";

class Page {
  protected screen_selector: string;
  protected allureReporter = allureReporter;

  constructor(selector: string) {
    this.screen_selector = selector;
  }

  protected waitForDisplayed(): void {
    browser.waitUntil(() => $(this.screen_selector).isDisplayed() === true);
  }

  public visit(path: string): void {
    this.allureReporter.startStep(`Visit Page ${this.constructor.name}`);
    browser.url(path);
    this.waitForDisplayed();
    this.allureReporter.endStep();
  }
}

export default Page;
