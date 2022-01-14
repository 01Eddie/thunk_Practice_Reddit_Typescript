module.exports = {
  webpack: (config) => {
    config.optimization.runtimeChunk = false
    config.optimization.splitChunks = {
      cacheGroups: {
        'default': false
      }
    }

    config.output.filename = 'static/js/[name].[contenthash].js'

    return config
  }
}
