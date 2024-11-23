const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// รวม config ของ Metro
const config = mergeConfig(getDefaultConfig(__dirname), {
  // ใส่การตั้งค่าที่คุณต้องการไว้ที่นี่
});

// ใช้ NativeWind กับไฟล์ CSS
const configWithNativeWind = withNativeWind(config, { input: './global.css' });

// ใช้ wrapWithReanimatedMetroConfig เพื่อรวม React Native Reanimated
module.exports = wrapWithReanimatedMetroConfig(configWithNativeWind);
