const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
});
