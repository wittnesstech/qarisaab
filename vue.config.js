module.exports = {
  devtool: process.env.NODE_ENV === "development" ? "source-map" : "none",
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
