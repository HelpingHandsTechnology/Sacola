const stylexPlugin = require("@stylexjs/babel-plugin")

function getPlatform(caller) {
  return caller && caller.platform
}

function getIsDev(caller) {
  if (caller?.isDev != null) return caller.isDev
  // https://babeljs.io/docs/options#envname
  return process.env.BABEL_ENV === "development" || process.env.NODE_ENV === "development"
}

module.exports = function (api) {
  const platform = api.caller(getPlatform)
  const isDev = api.caller(getIsDev)

  const plugins = []

  if (platform === "web") {
    plugins.push([
      stylexPlugin,
      {
        dev: isDev,
        importSources: ["@stylexjs/stylex", { from: "react-strict-dom", as: "css" }],
        runtimeInjection: isDev,
        styleResolution: "property-specificity",
        unstable_moduleResolution: {
          rootDir: __dirname,
          type: "commonJS",
        },
      },
    ])
  }

  return {
    plugins,
    presets: ["babel-preset-expo"],
  }
}
