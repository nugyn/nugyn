# Medley App - Architecture Documentation

## Overview

Medley is a React Native mobile application designed for personal health management with a focus on Australian healthcare integration (eScripts).

## Technology Stack

### Core Technologies
- **React Native 0.72**: Cross-platform mobile framework
- **JavaScript (ES6+)**: Primary programming language
- **React 18.2**: UI library

### Navigation
- **React Navigation 6**: Navigation framework
  - Bottom Tab Navigator for main screens
  - Stack Navigator for nested screens

### State Management
- **Local State (useState/useEffect)**: Component-level state
- **AsyncStorage**: Persistent local storage

### Data Persistence
- **@react-native-async-storage/async-storage**: Local key-value storage
  - No backend required
  - All data stored on device
  - Privacy-focused approach

### Notifications
- **react-native-push-notification**: Local push notifications
  - Medication reminders
  - Scheduled notifications
  - Background notifications

### UI Components
- **React Native Core Components**: View, Text, ScrollView, etc.
- **Custom Components**: Built as needed in screens

## Project Structure

```
medley-app/
│
├── src/
│   ├── screens/              # Screen components
│   │   ├── HomeScreen.js            # Dashboard/overview
│   │   ├── SymptomsScreen.js        # Symptom tracking
│   │   ├── MoodScreen.js            # Mood monitoring
│   │   ├── MedicationsScreen.js     # Medication management
│   │   └── EScriptsScreen.js        # eScripts management
│   │
│   ├── navigation/           # Navigation configuration
│   │   └── MainNavigator.js         # Bottom tab navigator
│   │
│   ├── services/             # Business logic & APIs
│   │   ├── StorageService.js        # Data persistence
│   │   └── NotificationService.js   # Push notifications
│   │
│   ├── components/           # Reusable components (future)
│   └── utils/               # Utility functions (future)
│
├── assets/                  # Images, fonts, etc.
├── android/                # Android native code
├── ios/                    # iOS native code
│
├── App.js                  # Root component
├── index.js               # App entry point
├── package.json           # Dependencies
└── app.json              # App configuration
```

## Core Modules

### 1. StorageService

**Purpose**: Handles all data persistence operations

**Key Methods**:
- `getSymptoms()` / `saveSymptoms()`
- `getMoods()` / `saveMoods()`
- `getMedications()` / `saveMedications()`
- `getEScripts()` / `saveEScripts()`
- `clearAll()` - Reset all data

**Storage Keys**:
```javascript
{
  SYMPTOMS: '@medley_symptoms',
  MOODS: '@medley_moods',
  MEDICATIONS: '@medley_medications',
  ESCRIPTS: '@medley_escripts',
}
```

**Data Format**:
All data stored as JSON arrays with object items containing:
- Unique ID (timestamp-based)
- Relevant fields
- Timestamps

### 2. NotificationService

**Purpose**: Manages local push notifications for medication reminders

**Key Methods**:
- `initialize()` - Setup notification channels
- `scheduleMedicationReminder(medication)` - Schedule notification
- `cancelMedicationReminder(medicationId)` - Cancel notification
- `getScheduledNotifications()` - List scheduled notifications

**Features**:
- Daily, twice daily, weekly, and as-needed frequencies
- Repeating notifications
- Works when app is closed
- Channel-based (Android)

### 3. Navigation

**Structure**: Bottom Tab Navigation

**Screens**:
1. Home - Dashboard/overview
2. Symptoms - Symptom tracking
3. Mood - Mood monitoring
4. Medications - Medication management
5. eScripts - Electronic prescriptions

**Configuration**:
- Custom colors (blue theme)
- Icons can be added
- Header styling

## Data Models

### Symptom
```javascript
{
  id: string,           // Unique identifier
  name: string,         // Symptom name
  severity: number,     // 1-10 scale
  notes: string,        // Optional notes
  date: string          // ISO timestamp
}
```

### Mood
```javascript
{
  id: string,           // Unique identifier
  mood: string,         // Mood label
  emoji: string,        // Emoji representation
  value: number,        // 1-5 scale
  notes: string,        // Optional notes
  date: string          // ISO timestamp
}
```

### Medication
```javascript
{
  id: string,           // Unique identifier
  name: string,         // Medication name
  dosage: string,       // Dosage information
  frequency: string,    // daily|twice_daily|weekly|as_needed
  time: string,         // HH:MM format
  notes: string,        // Optional notes
  nextDose: string,     // ISO timestamp
  lastTaken: string,    // ISO timestamp
  reminderEnabled: boolean,
  createdAt: string     // ISO timestamp
}
```

### eScript
```javascript
{
  id: string,           // Unique identifier
  tokenCode: string,    // eScript token
  medicationName: string,
  prescriber: string,
  repeats: string,      // Total repeats
  remainingRepeats: string,
  expiryDate: string,
  status: string,       // active|expired
  addedDate: string     // ISO timestamp
}
```

## Features & Flow

### 1. Symptom Tracking Flow
1. User taps "Add Symptom"
2. Enters symptom details (name, severity, notes)
3. Submits form
4. Data saved to AsyncStorage
5. List updates immediately
6. Can view history and delete entries

### 2. Mood Monitoring Flow
1. User taps "Record Mood"
2. Selects mood emoji
3. Optionally adds notes
4. Submits form
5. Data saved to AsyncStorage
6. Statistics calculated (average mood)
7. Can view history

### 3. Medication Management Flow
1. User taps "Add Medication"
2. Enters medication details
3. Sets reminder time and frequency
4. Submits form
5. Data saved to AsyncStorage
6. Notification scheduled
7. User can mark as taken
8. Next dose automatically calculated

### 4. eScripts Management Flow
1. User receives eScript token (SMS/email)
2. User taps "Add eScript"
3. Enters token and details
4. Data saved locally
5. Can view token at pharmacy
6. Track repeats remaining
7. Mark repeats as used

### 5. Dashboard Flow
1. App loads data from AsyncStorage
2. Calculates upcoming medications
3. Shows today's mood
4. Displays recent symptoms
5. Provides quick action links

## Security & Privacy

### Data Storage
- All data stored locally on device
- No cloud synchronization
- No external API calls
- No user accounts or authentication

### Data Access
- Only app can access AsyncStorage data
- Protected by OS-level security
- Can be deleted by clearing app data

### Future Considerations
- Optional biometric authentication
- Optional cloud backup
- Data encryption at rest

## Performance Considerations

### Optimization Strategies
- Minimal re-renders with proper state management
- Efficient list rendering (can add FlatList for large datasets)
- Lazy loading of data
- AsyncStorage operations are async and non-blocking

### Scalability
- Current architecture suitable for personal use
- For large datasets, consider:
  - Pagination
  - Virtual lists (FlatList/SectionList)
  - SQLite for complex queries
  - Data archiving

## Platform-Specific Considerations

### iOS
- Notification permissions required
- Background fetch capabilities
- Push notification entitlements

### Android
- Notification channels required
- Foreground service for reliable notifications
- Runtime permissions for notifications

## Future Enhancements

### Potential Additions
1. **Data Visualization**
   - Charts for symptom trends
   - Mood graphs over time
   - Medication adherence statistics

2. **Export/Import**
   - Export data to PDF/CSV
   - Backup/restore functionality
   - Share reports with healthcare providers

3. **Advanced Features**
   - Medication interaction checker
   - Appointment reminders
   - Doctor/pharmacy contacts
   - Photo attachments for symptoms

4. **Integration**
   - Apple Health / Google Fit
   - Calendar integration
   - Wearable device sync

5. **Cloud Features** (Optional)
   - Cloud backup
   - Multi-device sync
   - Family sharing

## Testing Strategy

### Manual Testing
- Test all CRUD operations
- Verify notifications
- Test navigation flows
- Check data persistence

### Future Testing
- Unit tests for services
- Integration tests for flows
- E2E tests with Detox
- Performance testing

## Deployment

### Development
- Metro bundler for hot reloading
- Debug builds for testing

### Production
- Release builds for app stores
- Code signing for iOS
- APK signing for Android
- App store compliance

## Dependencies

### Core Dependencies
- React Native ecosystem
- Navigation libraries
- Storage solution
- Notification framework

### Development Dependencies
- ESLint for linting
- Prettier for formatting
- Jest for testing
- Babel for transpilation

## Maintenance

### Regular Updates
- Keep React Native updated
- Update dependencies for security
- Test on new OS versions
- Monitor for deprecated APIs

### Monitoring
- Track crash reports
- Monitor notification delivery
- Check data integrity
- User feedback collection

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: nugyn
