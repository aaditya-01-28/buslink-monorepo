import 'dotenv/config';

export default {
  expo: {
    name: "BusLink",
    slug: "buslink",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#3D5A80"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.buslink.app",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "BusLink needs access to your location to show nearby buses and stops.",
        NSLocationAlwaysUsageDescription: "BusLink needs access to your location to show nearby buses and stops."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#3D5A80"
      },
      package: "com.buslink.app",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      },
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "INTERNET"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow BusLink to use your location to show nearby buses and stops."
        }
      ]
    ]
  }
};
