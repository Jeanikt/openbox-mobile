import { ExpoConfig, ConfigContext } from 'expo/config';

export default function ({ config }: ConfigContext): ExpoConfig {
  return {
    name: 'OpenBox Light',
    slug: process.env.EXPO_PUBLIC_APP_SLUG || 'chatwoot-mobile',
    version: '4.0.2',
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
      deploymentTarget: '15.0',
      infoPlist: {
        NSCameraUsageDescription:
          'OpenBox Light needs access to your camera so you can take photos of products, documents, or situations directly within the app and instantly share them with customers during conversations.',
        NSPhotoLibraryUsageDescription:
          'OpenBox Light needs access to your photo library so you can select and upload existing photos or documents from your device to include in conversations with customers.',
        NSMicrophoneUsageDescription:
          'OpenBox Light needs access to your microphone so you can record clear and personalized voice messages that can be sent directly to customers during conversations.',
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
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            minSdkVersion: 24,
            extraMavenRepos: [
              '$rootDir/../../../node_modules/@notifee/react-native/android/libs',
            ],
          },
          ios: {
            useFrameworks: 'static',
            deploymentTarget: '15.0',
          },
        },
      ],
    ],
    androidNavigationBar: {
      backgroundColor: '#ffffff',
    },
  };
}