import allureReporter from "@wdio/allure-reporter";

class Page {
  protected screenSelector: string;
  protected allureReporter = allureReporter;

  constructor(selector: string) {
    this.screenSelector = selector;
  }

  public waitForDisplayed(): void {
    browser.waitUntil(() => this.isDisplayed());
  }

  public visit(path: string): void {
    this.allureReporter.startStep(`Visit Page ${this.constructor.name}`);
    browser.url(path);
    this.waitForDisplayed();
    this.allureReporter.endStep();
  }

  public isDisplayed(): boolean {
    return $(this.screenSelector).isDisplayed();
  }
}

export default Page;
