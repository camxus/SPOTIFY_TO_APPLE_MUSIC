const path = require("path")

module.exports = {
  reactScriptsVersion: "react-scripts",
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ["node_modules", "src/assets"],
        },
      },
    },
    // postcss: {
    //   plugins: [require('postcss-rtl')()]
    // }
  },
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@store": path.resolve(__dirname, "src/redux"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@utils": path.resolve(__dirname, "src/utility/Utils"),
      "@hooks": path.resolve(__dirname, "src/utility/hooks"),
      "@api": path.resolve(__dirname, "src/sexs/api"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
}
