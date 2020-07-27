const wdioConf = require("./wdio.conf");
const merge = require("deepmerge");

const viewport = process.env.VIEWPORT;

exports.config = merge(
  wdioConf.config,
  {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
  },
  { clone: false }
);

exports.config.reporters.push([
  "junit",
  {
    outputDir: "junit-report",
    outputFileFormat: function (options) {
      return `junit-${options.cid}.${options.capabilities.browserName}.${viewport}.xml`;
    },
  },
]);

exports.config.services.push(['browserstack', { browserstackLocal: false }]);

exports.config.capabilities = [
  {
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 2,
    //
    browserName: "chrome",
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],
  },
  {
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 2,
    //
    browserName: "firefox",
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],
  },
];
