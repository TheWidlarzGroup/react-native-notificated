module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts', '.native.js'],
        alias: {
          Constants: './src/constants/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
