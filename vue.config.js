const Timestamp = new Date().getTime();

module.exports = {
  devServer:{
    proxy:'http://localhost:5050/'
  },
  configureWebpack: {
    //每次打包后生成的js携带时间戳
    output: {
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`,
    },
  },
  css: {
    loaderOptions: {
      //这只主题样式，修改此文件后需要重新启动
      less: {
        lessOptions: {
          modifyVars: {
            //这是配置css主题色
            "primary-color": "#007AFF",
          },
          javascriptEnabled: true,
        },
      },
    },
    // 每次打包后生成的css携带时间戳
    extract: {
      filename: `css/[name].${Timestamp}.css`,
      chunkFilename: `css/[name].${Timestamp}.css`,
    },
  },
};

