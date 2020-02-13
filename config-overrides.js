const getStyleFile = () => {
  const availableConfig = {
    toto: true
  };
  return (
    (availableConfig[process.env.APP_CONF] &&
      `./style/index.${process.env.APP_CONF}.css`) ||
    "./style/index.css"
  );
};

module.exports = function override(config, env) {
  console.log("overrides");
  //do stuff with the webpack config...
  let loaders = config.module.rules;
  config.module.rules = [
    {
      test: /\.js$/,
      loader: "string-replace-loader",
      options: {
        search: "__STYLE_APP__",
        replace: getStyleFile(),
        flags: "g"
      }
    },
    ...loaders
  ];
  return config;
};
