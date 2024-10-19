const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);



// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const config = {
//   transformer: {
//     // Use react-native-svg-transformer to handle SVG files
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     // Remove .svg from assetExts and add it to sourceExts
//     assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
