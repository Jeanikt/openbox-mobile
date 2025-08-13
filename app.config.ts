import { ExpoConfig, ConfigContext } from 'expo/config';

export default function ({ config }: ConfigContext): ExpoConfig {
  return {
    name: 'OpenBox Light',
    slug: process.env.EXPO_PUBLIC_APP_SLUG || 'chatwoot-mobile',
    version: '4.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.openboxlight.app',
      deploymentTarget: '14.0', // Changed to support iOS 14.0 for react-native-keyboard-controller 1.7.0
      infoPlist: {
        NSCameraUsageDescription:
          'This app requires access to the camera to upload images and videos.',
        NSPhotoLibraryUsageDescription:
          'This app requires access to the photo library to upload images.',
        NSMicrophoneUsageDescription:
          'This app requires access to the microphone to record audio.',
        NSAppleMusicUsageDescription:
          'This app does not use Apple Music, but a system API may require this permission.',
        UIBackgroundModes: ['fetch', 'remote-notification'],
        ITSAppUsesNonExemptEncryption: false,
      },
      googleServicesFile:
        process.env.EXPO_PUBLIC_IOS_GOOGLE_SERVICES_FILE || './GoogleService-Info.plist',
      entitlements: {
        'aps-environment': 'production',
      },
      associatedDomains: ['applinks:light.openboxbrasil.com.br'],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.openboxlight.app',
      permissions: [
        'android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.RECORD_AUDIO',
        'android.permission.READ_MEDIA_IMAGES',
      ],
      googleServicesFile:
        process.env.EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES_FILE || './google-services.json',
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: 'light.openboxbrasil.com.br',
              pathPrefix: '/app/accounts/',
              pathPattern: '/*/conversations/*',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
      minSdkVersion: 24,
    },
    extra: {
      eas: {
        projectId:
          process.env.EXPO_PUBLIC_PROJECT_ID || '8d6b1b2d-8c95-4e55-bf54-f3048bc531cd',
        storybookEnabled: process.env.EXPO_STORYBOOK_ENABLED,
      },
    },
    owner: '44jeazy',
    plugins: [
      [
        'react-native-permissions',
        {
          iosPermissions: ['Camera', 'PhotoLibrary', 'MediaLibrary'],
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            minSdkVersion: 24,
            extraMavenRepos: [
              '$rootDir/../../../node_modules/@notifee/react-native/android/libs',
            ],
          },
          ios: {
            useFrameworks: 'static',
            deploymentTarget: '14.0', // Changed to support iOS 14.0
          },
        },
      ],
    ],
    androidNavigationBar: {
      backgroundColor: '#ffffff',
    },
  };
}