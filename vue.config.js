module.exports = {
  configureWebpack: config => {
    devtool: "eval-source-map";
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  },
  pwa: {
    name: "Qari Saab",
    themeColor: "#7F4DBA",
    msTileColor: "#290497"
  },
  //TODO tidyup this shit
  configureWebpack: {
    devtool: "source-map"
  }
};
