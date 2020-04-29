module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/styles/mainStyles.scss';"
      }
    }
  }
};
