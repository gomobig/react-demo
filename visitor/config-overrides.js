const { injectBabelPlugin} = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less-modules");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd-mobile", style: true, libraryDirectory: "es" }],
    config,
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#108EE9" },
    javascriptEnabled: true,
  })(config, env);
  // config = rewireLess(config, env);
  return config;
};