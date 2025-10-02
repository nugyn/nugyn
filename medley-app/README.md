# Medley - Health Management App

Medley is a comprehensive mobile health management application built with React Native. Similar to Medvisor, Medley helps you track symptoms, monitor moods, manage medications, and handle electronic prescriptions (eScripts) compatible with the Australian healthcare system.

## Features

### 🏥 Symptom Tracking
- Log daily symptoms with severity ratings (1-10)
- Add detailed notes for each symptom
- View symptom history and patterns
- Track multiple symptoms over time

### 😊 Mood Monitoring
- Record daily moods with emoji-based interface
- Add context notes about your emotional state
- View mood trends and averages
- Understand emotional patterns

### 💊 Medication Management
- Add medications with dosage information
- Set customizable reminder times
- Multiple frequency options (daily, twice daily, weekly, as needed)
- Track medication schedules
- Mark doses as taken
- Push notifications for medication reminders

### 📱 eScripts Integration (Australia)
- Store electronic prescription (eScript) token codes
- Track prescription details and expiry dates
- Manage repeat prescriptions
- Mark repeats as used
- Compatible with Australian eScript system
- Quick access to eScript information at pharmacies

### 🏠 Dashboard
- Quick overview of upcoming medications
- Today's mood at a glance
- Recent symptom history
- Easy navigation to all features

## Requirements

- Node.js >= 16
- React Native development environment
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and SDK

## Installation

1. **Clone the repository**
   ```bash
   cd medley-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Android Setup**
   - Ensure Android SDK is installed
   - Configure environment variables (ANDROID_HOME)

## Running the App

### iOS
```bash
npm run ios
```

Or open `ios/Medley.xcworkspace` in Xcode and run from there.

### Android
```bash
npm run android
```

Or open the `android` folder in Android Studio and run from there.

### Start Metro Bundler
```bash
npm start
```

## Development

### Project Structure
```
medley-app/
├── src/
│   ├── screens/          # App screens
│   │   ├── HomeScreen.js
│   │   ├── SymptomsScreen.js
│   │   ├── MoodScreen.js
│   │   ├── MedicationsScreen.js
│   │   └── EScriptsScreen.js
│   ├── navigation/       # Navigation setup
│   │   └── MainNavigator.js
│   ├── services/         # Business logic
│   │   ├── StorageService.js
│   │   └── NotificationService.js
│   ├── components/       # Reusable components
│   └── utils/           # Utility functions
├── assets/              # Images and resources
├── App.js              # Main app component
├── index.js            # Entry point
└── package.json        # Dependencies
```

### Key Technologies
- **React Native 0.72**: Cross-platform mobile framework
- **React Navigation**: Navigation library for tabs and screens
- **AsyncStorage**: Local data persistence
- **Push Notifications**: Medication reminders
- **React Native Gesture Handler**: Touch interactions

## Features in Detail

### Data Storage
All data is stored locally on the device using AsyncStorage:
- Symptoms
- Moods
- Medications
- eScripts

No data is sent to external servers, ensuring privacy.

### Notifications
Medication reminders use local push notifications:
- Scheduled at specified times
- Repeating based on frequency settings
- Can be cancelled or rescheduled
- Works even when app is closed

### eScripts (Australian Healthcare)
The app supports the Australian eScript system:
- Store token codes received via SMS/email
- Track prescription metadata
- Manage repeats
- Keep prescriptions organized
- Present token codes at any pharmacy

## Privacy & Security

- All data stored locally on device
- No external data transmission
- No user accounts required
- No analytics or tracking
- Data remains on your device

## Future Enhancements

Potential features for future versions:
- Export health data to PDF
- Integration with Apple Health / Google Fit
- Medication interaction warnings
- Appointment reminders
- Doctor/pharmacy contact information
- Health trend visualizations and charts
- Biometric authentication for app access
- Cloud backup (optional)

## Australian Healthcare Integration

### eScripts System
The Australian electronic prescribing (eScript) system allows prescriptions to be sent electronically:
- Patients receive an SMS or email with a token code
- Token can be used at any participating pharmacy
- Reduces paper waste and improves convenience
- Fully integrated into the Australian healthcare system

Learn more: [Digital Health Australia](https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescribing)

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Troubleshooting

### Common Issues

**Metro Bundler Issues**
```bash
npm start -- --reset-cache
```

**Build Failures**
```bash
# Clean build folders
cd android && ./gradlew clean && cd ..
cd ios && rm -rf Pods && pod install && cd ..
```

**Notification Issues**
- Ensure notification permissions are granted
- Check device notification settings
- Verify channel configuration (Android)

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - feel free to use and modify for personal use.

## Acknowledgments

- Inspired by Medvisor and other health management apps
- Built for the Australian healthcare ecosystem
- Designed with privacy and simplicity in mind

## Support

For issues or questions about the app, please open an issue on GitHub.

---

**Note**: This app is for personal health tracking only and should not replace professional medical advice. Always consult with healthcare professionals for medical decisions.
