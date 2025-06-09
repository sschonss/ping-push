/** @type {import('nativewind').NativeWindConfig} */
module.exports = {
  input: './src/**/*.{js,jsx,ts,tsx}',
  output: {
    path: './node_modules/.nativewind',
    mode: 'transform',
    platform: null,
  },
};
