#!/bin/bash
# eas-build-post-install.sh

# Enforce iOS 14.0 in Podfile
sed -i '' 's/platform :ios, .*/platform :ios, "14.0"/' ios/Podfile

# Enforce iOS 14.0 in react-native-keyboard-controller Podspec
sed -i '' "s/s.platform = :ios, '.*'/s.platform = :ios, '14.0'/" node_modules/react-native-keyboard-controller/react-native-keyboard-controller.podspec

# Fix RNFB Core Configuration script by adding output files
echo 'Adding output files to RNFB Core Configuration script'
sed -i '' '/\[CP-User\] \[RNFB\] Core Configuration/a\
  set_script_output_files "${PODS_ROOT}/FirebaseCore/FirebaseCore.h ${PODS_ROOT}/Firebase/Messaging/FIRMessaging.h"' ios/Pods/Target\ Support\ Files/Pods-OpenBoxLight/Pods-OpenBoxLight.debug.xcconfig