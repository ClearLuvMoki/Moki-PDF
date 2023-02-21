module.exports = {
  rules: [
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      include: /src/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      ],
    },
    {
      test: /\.css$/, //匹配所有的 css 文件
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif|pdf|svg)$/,
      type: 'javascript/auto',
      loader: 'file-loader',
      options: {
        esModule: false,
        loader: 'url-loader',
        name: 'images/[name].[ext]',
        options: {
          limit: 10240,
        },
      },
    },
  ],
};
