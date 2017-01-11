var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");


module.exports = {
  entry: {
    index:'./public/html/js/index.js',
    main:'./public/html/js/main.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },

  plugins: [
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false,
    //  },
    //  output: {
    //    comments: false,
    //  },
    //}),//压缩和丑化

    new webpack.ProvidePlugin({
      $: 'jquery'
    }),//直接定义第三方库

    new CommonsChunkPlugin({
      name: "commons",
      // (the commons chunk name)

      filename: "commons.js",
      // (the filename of the commons chunk)

       minChunks: 2,
      // (Modules must be shared between 3 entries)

      chunks: ["index", "main"]
      // (Only use these entries)
    })//定义公共chunk

  ]
};
/*module.exports = {
	entry: ['./src/index'], // file extension after index is optional for .js files
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: "./src",//本地服务器所加载的页面所在的目录
		colors: true,//终端中输出结果为彩色
		historyApiFallback: true,//不跳转
		inline: true//实时刷新
	},
	module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' }

        ]
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		  compressor: {
			warnings: false,
		  },
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	]
}*/