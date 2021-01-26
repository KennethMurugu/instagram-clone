module.exports = {
    lintOnSave: false,
    css: {
      loaderOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/abstracts/_vars.scss";`,
        },
      },
    },
    chainWebpack: (config) => {
      config.plugin('html').tap((args) => {
        args[0].title = 'Instagram'
        return args
      })
    },
  }
  