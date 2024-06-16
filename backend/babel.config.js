module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
}
