# Medley App - Features Guide

Comprehensive guide to all features available in the Medley health management app.

## 📱 Main Features

### 🏠 Dashboard (Home Screen)

The dashboard provides a quick overview of your health data:

**Upcoming Medications**
- Shows next 3 upcoming medication reminders within 24 hours
- Displays medication name, dosage, and scheduled time
- Quick link to add medications if none exist

**Today's Mood**
- Shows your current mood if recorded today
- Displays mood emoji and any notes
- Quick link to record mood if not yet logged

**Recent Symptoms**
- Shows last 3 tracked symptoms
- Displays symptom name, severity, and date
- Quick link to track new symptoms

**Quick Actions**
- Direct access to eScripts manager
- Navigate to any section quickly

---

## 📊 Symptom Tracking

Track and monitor your symptoms over time to identify patterns and share with healthcare providers.

### Features

**Add New Symptom**
- Enter symptom name (e.g., headache, nausea, fatigue)
- Rate severity on 1-10 scale
  - 1-3: Mild (green)
  - 4-6: Moderate (yellow)
  - 7-10: Severe (red)
- Add optional notes for context
- Automatic timestamp

**View Symptom History**
- Chronological list of all symptoms
- Visual severity indicator with color coding
- View date and time of each entry
- Search through past symptoms

**Manage Symptoms**
- Delete individual symptom entries
- Edit notes (future feature)
- Export symptom history (future feature)

### Use Cases

- Track chronic condition symptoms
- Monitor medication side effects
- Identify symptom triggers
- Prepare for doctor appointments
- Share symptom patterns with healthcare providers

---

## 😊 Mood Monitoring

Monitor your emotional well-being with a simple, visual mood tracking system.

### Features

**Record Your Mood**
- Five mood options:
  - 😊 Great (5/5)
  - 🙂 Good (4/5)
  - 😐 Okay (3/5)
  - 😟 Not Good (2/5)
  - 😢 Bad (1/5)
- Add optional notes about your day
- One-tap mood selection
- Automatic timestamp

**Mood Statistics**
- Average mood score
- Total entries count
- Trend visualization (future feature)

**Mood History**
- View all past mood entries
- See mood context and notes
- Track emotional patterns
- Delete individual entries

### Use Cases

- Monitor mental health
- Identify mood patterns
- Track effectiveness of treatments
- Recognize mood triggers
- Share mental health data with therapist
- Practice mindfulness

---

## 💊 Medication Management

Comprehensive medication tracking with intelligent reminders.

### Features

**Add Medication**
- Medication name
- Dosage information (e.g., "500mg", "1 tablet")
- Frequency options:
  - Daily
  - Twice daily
  - Weekly
  - As needed (PRN)
- Reminder time (24-hour format)
- Optional notes (e.g., "Take with food")

**Medication Reminders**
- Local push notifications at scheduled times
- Repeating notifications based on frequency
- Works even when app is closed
- Customizable notification sound
- Snooze and dismiss options

**Track Medications**
- View all active medications
- See next dose schedule
- View medication details
- Mark medication as taken
- Automatic next dose calculation

**Manage Medications**
- Delete medications
- Cancel reminders
- Edit medication details (future feature)
- View medication history (future feature)

### Use Cases

- Never miss a medication dose
- Manage multiple medications
- Track medication schedules
- Coordinate timing with meals
- Manage complex medication regimens
- Share medication list with doctors

---

## 📱 eScripts Management (Australian Healthcare)

Manage electronic prescriptions compatible with the Australian eScript system.

### What are eScripts?

eScripts (electronic prescriptions) are the Australian digital alternative to paper prescriptions:
- Sent via SMS or email
- Contains a unique token code
- Can be used at any participating pharmacy
- More convenient and secure than paper
- Part of Australia's digital health initiative

### Features

**Add eScript**
- Store token code
- Medication name
- Prescriber information
- Number of repeats
- Expiry date
- Automatic status tracking

**Manage eScripts**
- View all stored eScripts
- Display token code at pharmacy
- Track remaining repeats
- Mark repeats as used
- Automatic expiry tracking
- Status indicators:
  - 🟢 Active (has repeats)
  - 🔴 Expired (no repeats)

**eScript Information**
- Learn about the Australian eScript system
- Link to official Digital Health resources
- How to use eScripts at pharmacy
- eScript FAQs

### Use Cases

- Store all prescription tokens in one place
- Access prescriptions without paper
- Track medication repeats
- Never lose a prescription
- Quick access at pharmacy
- Manage multiple prescriptions
- Share prescription info with family

### How to Use eScripts

1. **Receive eScript**: Doctor sends prescription via SMS/email
2. **Add to App**: Copy token code into Medley
3. **At Pharmacy**: Show token code from app
4. **Track Repeats**: Mark repeats as used in app
5. **Expiry**: App tracks when prescription expires

---

## 🔔 Notifications

### Medication Reminders

**Features**:
- Scheduled local notifications
- Custom notification sound
- Vibration support
- Display medication name and dosage
- Works in background
- Repeating notifications

**Configuration**:
- Set custom reminder times
- Choose frequency
- Enable/disable per medication
- Snooze functionality (device default)

**Notification Channels** (Android):
- "Medication Reminders" channel
- High importance
- Custom sound and vibration

---

## 💾 Data Management

### Local Storage

**What's Stored**:
- All symptoms
- All moods
- All medications
- All eScripts

**How It's Stored**:
- Locally on your device
- AsyncStorage (encrypted by OS)
- No cloud sync
- Privacy-focused

**Data Privacy**:
- No data leaves your device
- No accounts required
- No analytics or tracking
- You control your data

### Data Export (Future)

Planned features:
- Export to PDF
- Export to CSV
- Share with healthcare providers
- Backup to cloud (optional)
- Import previous data

---

## 🎨 User Interface

### Design Philosophy

- **Clean & Simple**: Intuitive interface
- **Color-Coded**: Visual indicators for quick understanding
- **Accessible**: Large touch targets, readable fonts
- **Consistent**: Unified design across screens
- **Mobile-First**: Optimized for smartphone use

### Color Scheme

- **Primary**: Blue (#4A90E2) - Actions, active states
- **Success**: Green (#4CAF50) - Positive actions
- **Warning**: Yellow (#FFC107) - Moderate alerts
- **Error**: Red (#F44336) - Deletions, high severity
- **Background**: Light gray (#F5F5F5)
- **Cards**: White (#FFFFFF)

### Navigation

- **Bottom Tabs**: Main navigation
- **Icons**: Clear visual indicators (to be added)
- **Headers**: Screen titles and context
- **Back Navigation**: Standard patterns

---

## 🔒 Security & Privacy

### Current Implementation

**Local Storage Only**
- All data on device
- No external servers
- No user accounts
- No data collection

**OS-Level Security**
- AsyncStorage protected by OS
- App sandboxing
- Secure by default

### Future Security Features

- Biometric authentication (Face ID / Fingerprint)
- PIN lock
- Data encryption
- Auto-lock timer
- Secure data export

---

## 🚀 Future Features

### Planned Enhancements

**Data Visualization**
- 📈 Symptom trends chart
- 📊 Mood graph over time
- 📉 Medication adherence statistics
- 📅 Calendar view

**Integration**
- 🏥 Apple Health sync
- 💪 Google Fit integration
- 📆 Calendar integration for appointments
- ⌚ Wearable device support

**Advanced Features**
- 🔔 Appointment reminders
- 👨‍⚕️ Doctor contact information
- 💊 Medication interaction checker
- 📸 Photo attachments for symptoms
- 🗓️ Custom reminder schedules
- 📋 Generate health reports

**Export & Sharing**
- 📄 Export data to PDF
- 📊 CSV export for analysis
- 📧 Email reports to doctors
- ☁️ Optional cloud backup
- 👨‍👩‍👧‍👦 Family sharing features

**Accessibility**
- 🔊 VoiceOver support
- 🔤 Dynamic text sizing
- 🎨 High contrast mode
- 🌐 Multiple language support

---

## 💡 Tips & Tricks

### Best Practices

**Symptom Tracking**
- Track symptoms consistently
- Include relevant context in notes
- Rate severity honestly
- Review patterns weekly

**Mood Monitoring**
- Record mood at same time daily
- Be honest with yourself
- Note significant events
- Look for patterns over time

**Medication Management**
- Set realistic reminder times
- Mark doses as taken immediately
- Update when prescriptions change
- Review medication list regularly

**eScripts**
- Add eScripts immediately when received
- Check expiry dates regularly
- Update repeats after pharmacy visits
- Keep token codes secure

### Optimization

- Clear old data periodically (future feature)
- Review and update medications
- Archive completed prescriptions
- Back up data before updates

---

## 📞 Support

### Getting Help

- Check the [README.md](./README.md)
- Review [SETUP.md](./SETUP.md)
- Check [ARCHITECTURE.md](./ARCHITECTURE.md)
- Open issue on GitHub

### Feedback

Your feedback helps improve Medley:
- Feature requests
- Bug reports
- Usability suggestions
- Design improvements

---

## 🏥 Healthcare Integration

### Australian Healthcare System

Medley is designed with the Australian healthcare system in mind:
- eScripts support
- Medicare compatibility (future)
- My Health Record integration (future)
- Australian medication database (future)

### International Use

While designed for Australia, Medley can be used anywhere:
- Symptom tracking is universal
- Mood monitoring works globally
- Medication reminders work everywhere
- eScripts feature optional for non-Australian users

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Platform**: iOS & Android
