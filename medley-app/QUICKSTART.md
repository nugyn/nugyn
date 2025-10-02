# Medley App - Quick Start Guide

Get up and running with Medley in 5 minutes!

## 🚀 Quick Setup

### Prerequisites Check

```bash
# Check Node.js (need v16+)
node --version

# Check npm
npm --version
```

If you don't have Node.js, install it from [nodejs.org](https://nodejs.org/)

### Installation

```bash
# Navigate to the app directory
cd medley-app

# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

### Run the App

**iOS (macOS only):**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

That's it! The app should launch in a simulator/emulator.

---

## 📱 App Overview

### Main Screens

```
┌─────────────────────────────────────┐
│          🏠 Home Screen             │
│  Dashboard with overview of health  │
│  - Upcoming medications             │
│  - Today's mood                     │
│  - Recent symptoms                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       📊 Symptoms Screen            │
│  Track and monitor symptoms         │
│  - Add symptom with severity        │
│  - View symptom history             │
│  - Color-coded by severity          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         😊 Mood Screen              │
│  Monitor emotional well-being       │
│  - Select mood emoji                │
│  - Add notes                        │
│  - View mood statistics             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      💊 Medications Screen          │
│  Manage medications & reminders     │
│  - Add medication details           │
│  - Set reminder times               │
│  - Mark as taken                    │
│  - Get push notifications           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       📱 eScripts Screen            │
│  Australian electronic prescriptions│
│  - Store eScript tokens             │
│  - Track repeats                    │
│  - View at pharmacy                 │
└─────────────────────────────────────┘
```

---

## ⚡ First Steps

### 1. Track Your First Symptom

1. Tap **Symptoms** tab
2. Tap **+ Add Symptom**
3. Enter symptom name (e.g., "Headache")
4. Select severity (1-10)
5. Add optional notes
6. Tap **Save**

### 2. Record Your Mood

1. Tap **Mood** tab
2. Tap **+ Record Mood**
3. Select an emoji (😊 🙂 😐 😟 😢)
4. Add optional notes
5. Tap **Save**

### 3. Add a Medication

1. Tap **Medications** tab
2. Tap **+ Add Medication**
3. Enter medication name
4. Enter dosage
5. Select frequency (Daily, Twice Daily, etc.)
6. Set reminder time (e.g., "09:00")
7. Tap **Save**

**Note**: Notification permission will be requested for reminders.

### 4. Add an eScript (Australian Users)

1. Receive eScript via SMS/email from doctor
2. Tap **eScripts** tab
3. Tap **+ Add eScript**
4. Enter token code from SMS/email
5. Enter medication name
6. Add prescriber and repeat information
7. Tap **Save**

---

## 🎯 Key Features

### ✅ What Works Out of the Box

- ✅ Track unlimited symptoms
- ✅ Monitor daily moods
- ✅ Set medication reminders
- ✅ Store eScript tokens
- ✅ Push notifications
- ✅ All data stored locally (private)
- ✅ Works offline
- ✅ No account needed

### 🔔 Notifications

Medication reminders work automatically:
- Set once, repeats automatically
- Works even when app is closed
- Customizable times
- Multiple medications supported

**Important**: Grant notification permissions when prompted!

### 💾 Data Storage

All your data is stored locally on your device:
- **Private**: No data sent to servers
- **Secure**: Protected by device OS
- **Persistent**: Data survives app restarts
- **Yours**: You control your data

---

## 🛠️ Troubleshooting

### App Won't Start

```bash
# Reset Metro cache
npm start -- --reset-cache

# Clean install
rm -rf node_modules
npm install
```

### iOS Build Issues

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

### Android Build Issues

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Notifications Not Working

1. Check device notification settings
2. Ensure app has notification permission
3. Try adding a new medication
4. Restart the app

---

## 📚 More Information

Dive deeper into specific topics:

- **[README.md](./README.md)** - Full app overview
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[FEATURES.md](./FEATURES.md)** - Complete feature guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical details

---

## 🎨 Customization

### Change Colors

Edit screen files in `src/screens/` and modify the `styles` object:

```javascript
// Example: Change primary color
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4A90E2', // Change this to your color
    // ...
  }
});
```

### Add More Moods

Edit `src/screens/MoodScreen.js`:

```javascript
const MOODS = [
  {emoji: '😊', label: 'Great', value: 5},
  {emoji: '🙂', label: 'Good', value: 4},
  // Add more moods here
];
```

---

## 💡 Pro Tips

1. **Track Consistently**: Set a daily time to log symptoms and mood
2. **Be Detailed**: Add notes to track patterns
3. **Review Regularly**: Check your history weekly
4. **Share with Doctors**: Show your tracking data at appointments
5. **Backup Data**: Future feature, but be careful not to delete app data

---

## 🐛 Found a Bug?

1. Check the troubleshooting section
2. Review existing issues on GitHub
3. Create a new issue with details:
   - What happened?
   - What did you expect?
   - Steps to reproduce
   - Device and OS version

---

## 🎉 Success!

You're all set! Start tracking your health with Medley.

### Next Steps

1. ✅ Track symptoms regularly
2. ✅ Monitor your mood daily
3. ✅ Set up medication reminders
4. ✅ Store your eScripts
5. ✅ Share data with healthcare providers

---

**Need Help?** Check the full [README.md](./README.md) or open an issue on GitHub.

**Happy Tracking!** 🏥💊😊
