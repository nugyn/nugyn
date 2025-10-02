# Medley App - Setup Guide

This guide will help you set up and run the Medley app on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Watchman** (for macOS/Linux)
   ```bash
   # macOS
   brew install watchman
   
   # Linux
   # Follow instructions at https://facebook.github.io/watchman/docs/install.html
   ```

### For iOS Development (macOS only)

4. **Xcode** (latest version)
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

5. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

### For Android Development

6. **Android Studio**
   - Download from [developer.android.com](https://developer.android.com/studio)
   - During installation, ensure you select:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

7. **Configure Environment Variables**
   
   Add to your `~/.bash_profile` or `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

   Then reload:
   ```bash
   source ~/.bash_profile  # or ~/.zshrc
   ```

## Installation Steps

### 1. Navigate to the Project Directory

```bash
cd medley-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

This installs iOS-specific dependencies using CocoaPods.

### 4. Android Setup

No additional setup needed if Android Studio is configured correctly.

## Running the App

### Start Metro Bundler

In one terminal window:

```bash
npm start
```

Keep this running in the background.

### Run on iOS

In a new terminal window:

```bash
npm run ios
```

Or to run on a specific simulator:

```bash
npx react-native run-ios --simulator="iPhone 14 Pro"
```

### Run on Android

Make sure you have an Android emulator running, or a physical device connected, then:

```bash
npm run android
```

## Troubleshooting

### Metro Bundler Issues

If you encounter caching issues:

```bash
npm start -- --reset-cache
```

### iOS Build Failures

1. Clean build:
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   pod install
   cd ..
   ```

2. Clean Xcode build:
   - Open `ios/Medley.xcworkspace` in Xcode
   - Product → Clean Build Folder (Cmd+Shift+K)

### Android Build Failures

1. Clean Gradle:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. Check Android SDK:
   - Open Android Studio
   - Tools → SDK Manager
   - Ensure Android 13 (Tiramisu) is installed

### Permission Issues

If you get permission errors on macOS/Linux:

```bash
sudo chown -R $(whoami) ~/Library/Caches/CocoaPods
sudo chown -R $(whoami) ~/.npm
```

### Port Already in Use

If port 8081 is already in use:

```bash
# Find and kill the process
lsof -i :8081
kill -9 <PID>
```

## Testing the App

Once the app is running, you should see:

1. **Home Screen** - Dashboard with overview
2. **Symptoms Tab** - Track symptoms
3. **Mood Tab** - Monitor moods
4. **Medications Tab** - Manage medications and reminders
5. **eScripts Tab** - Manage electronic prescriptions

## Development Tips

### Hot Reloading

- The app supports hot reloading
- Save any file to see changes immediately
- Shake device (or Cmd+D on iOS / Cmd+M on Android) for dev menu

### Debugging

1. **Chrome DevTools**
   - Open dev menu
   - Select "Debug"
   - Opens Chrome DevTools for debugging

2. **React DevTools**
   ```bash
   npm install -g react-devtools
   react-devtools
   ```

### Viewing Logs

iOS:
```bash
npx react-native log-ios
```

Android:
```bash
npx react-native log-android
```

## Building for Production

### iOS

1. Open `ios/Medley.xcworkspace` in Xcode
2. Select "Generic iOS Device" as build target
3. Product → Archive
4. Follow the wizard to upload to App Store Connect

### Android

```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Next Steps

1. Test all features:
   - Add symptoms
   - Record moods
   - Create medication reminders
   - Add eScript information

2. Customize the app:
   - Modify colors in screen styles
   - Add new features as needed
   - Adjust notification settings

3. Deploy:
   - Build for your device
   - Share with testers
   - Publish to App Store / Google Play

## Getting Help

- Check the [README.md](./README.md) for feature documentation
- Review React Native documentation: [reactnative.dev](https://reactnative.dev/)
- Check issues on GitHub

## Additional Resources

- [React Navigation Docs](https://reactnavigation.org/)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)
- [React Native Push Notification](https://github.com/zo0r/react-native-push-notification)
- [Australian eScripts](https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescribing)

---

**Happy Coding!** 🎉
