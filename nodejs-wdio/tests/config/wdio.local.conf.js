const wdioConf = require("./wdio.conf");
const merge = require("deepmerge");

exports.config = merge(
  wdioConf.config,
  {
    hostname: "localhost",
    port: 4444,
    path: "/wd/hub",
    maxInstances: 3,
  },
  { clone: false }
);

exports.config.services.push(["selenium-standalone", {}]);