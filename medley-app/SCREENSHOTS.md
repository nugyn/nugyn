# Medley App - Visual Guide

This document provides a text-based visual representation of the app screens and user flows.

## 📱 App Navigation Structure

```
┌─────────────────────────────────────────────────────┐
│  Medley - Health Management App                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────┬───────┬──────┬────────────┬──────────┐ │
│  │ Home  │Symptom│ Mood │Medication │ eScripts │ │
│  │   🏠  │  📊   │  😊  │    💊     │    📱    │ │
│  └───────┴───────┴──────┴────────────┴──────────┘ │
│         [Bottom Tab Navigation Bar]                │
└─────────────────────────────────────────────────────┘
```

---

## 🏠 Home Screen

```
┌─────────────────────────────────────┐
│        Medley                  [=]  │
├─────────────────────────────────────┤
│  ╔═══════════════════════════════╗  │
│  ║     Welcome to Medley         ║  │
│  ║  Your health companion        ║  │
│  ╚═══════════════════════════════╝  │
│                                     │
│  Upcoming Medications               │
│  ┌─────────────────────────────┐   │
│  │ Paracetamol                 │   │
│  │ 500mg - 09:00 AM            │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Ibuprofen                   │   │
│  │ 200mg - 02:00 PM            │   │
│  └─────────────────────────────┘   │
│                                     │
│  Today's Mood                       │
│  ┌─────────────────────────────┐   │
│  │        😊                   │   │
│  │      Great                  │   │
│  │   Feeling good today!       │   │
│  └─────────────────────────────┘   │
│                                     │
│  Recent Symptoms                    │
│  ┌─────────────────────────────┐   │
│  │ Headache                    │   │
│  │ Severity: 6/10 - Yesterday  │   │
│  └─────────────────────────────┘   │
│                                     │
│  Quick Actions                      │
│  [ View eScripts ]                  │
│                                     │
└─────────────────────────────────────┘
```

---

## 📊 Symptoms Screen

### Main View
```
┌─────────────────────────────────────┐
│  Symptom Tracker              [=]   │
├─────────────────────────────────────┤
│  Track Your Symptoms                │
│  Monitor your symptoms over time    │
│  to identify patterns               │
│                                     │
│  [  + Add Symptom  ]                │
│                                     │
│  Symptom History                    │
│  ┌─────────────────────────────┐   │
│  │ Headache               [×]  │   │
│  │ ████████░░ 8/10            │   │
│  │ Started after lunch         │   │
│  │ Today, 2:30 PM              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Nausea                 [×]  │   │
│  │ █████░░░░░ 5/10            │   │
│  │ Yesterday, 9:00 AM          │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Fatigue                [×]  │   │
│  │ ███░░░░░░░ 3/10            │   │
│  │ 2 days ago                  │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Add Symptom Form
```
┌─────────────────────────────────────┐
│  Symptom Tracker              [=]   │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Add New Symptom             │   │
│  │                             │   │
│  │ Symptom Name *              │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ e.g., Headache, Nausea  │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Severity (1-10)             │   │
│  │ ┌─────┐                     │   │
│  │ │  7  │                     │   │
│  │ └─────┘                     │   │
│  │ Mild  Moderate  Severe      │   │
│  │                             │   │
│  │ Notes (Optional)            │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ Additional details...   │ │   │
│  │ │                         │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ [ Cancel ]    [ Save ]      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 😊 Mood Screen

### Main View
```
┌─────────────────────────────────────┐
│  Mood Monitor                 [=]   │
├─────────────────────────────────────┤
│  Track Your Mood                    │
│  Monitor your emotional well-being  │
│                                     │
│  Average Mood: 4.2/5                │
│  Total Entries: 15                  │
│                                     │
│  [  + Record Mood  ]                │
│                                     │
│  Mood History                       │
│  ┌─────────────────────────────┐   │
│  │  😊  Great            [×]   │   │
│  │  Had a wonderful day at work│   │
│  │  Today, 8:00 PM             │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  🙂  Good             [×]   │   │
│  │  Yesterday, 7:30 PM         │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  😐  Okay             [×]   │   │
│  │  Feeling neutral            │   │
│  │  2 days ago, 8:00 PM        │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Record Mood Form
```
┌─────────────────────────────────────┐
│  Mood Monitor                 [=]   │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ How are you feeling?        │   │
│  │                             │   │
│  │  😊    🙂    😐    😟   😢  │   │
│  │ Great Good Okay  Not  Bad   │   │
│  │                      Good   │   │
│  │  [Selected: 😊 Great]       │   │
│  │                             │   │
│  │ Notes (Optional)            │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ What's on your mind?    │ │   │
│  │ │                         │ │   │
│  │ │                         │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ [ Cancel ]    [ Save ]      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 💊 Medications Screen

### Main View
```
┌─────────────────────────────────────┐
│  Medications                  [=]   │
├─────────────────────────────────────┤
│  Manage Medications                 │
│  Set reminders and track your       │
│  medications                        │
│                                     │
│  [  + Add Medication  ]             │
│                                     │
│  My Medications                     │
│  ┌─────────────────────────────┐   │
│  │ Paracetamol          [×]    │   │
│  │ 500mg                       │   │
│  │ 📅 Daily      ⏰ 09:00      │   │
│  │                             │   │
│  │ Next dose:                  │   │
│  │ Tomorrow, 09:00 AM          │   │
│  │                             │   │
│  │ [ ✓ Mark as Taken ]         │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Ibuprofen            [×]    │   │
│  │ 200mg                       │   │
│  │ 📅 Twice Daily ⏰ 09:00     │   │
│  │ Take with food              │   │
│  │                             │   │
│  │ Next dose:                  │   │
│  │ Today, 09:00 PM             │   │
│  │                             │   │
│  │ [ ✓ Mark as Taken ]         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Add Medication Form
```
┌─────────────────────────────────────┐
│  Medications                  [=]   │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Add New Medication          │   │
│  │                             │   │
│  │ Medication Name *           │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ e.g., Paracetamol       │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Dosage *                    │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ e.g., 500mg, 1 tablet   │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Frequency                   │   │
│  │ [Daily] [Twice Daily]       │   │
│  │ [Weekly] [As Needed]        │   │
│  │                             │   │
│  │ Reminder Time               │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ 09:00                   │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Notes (Optional)            │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ Special instructions... │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ [ Cancel ]    [ Save ]      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 📱 eScripts Screen

### Main View
```
┌─────────────────────────────────────┐
│  eScripts                     [=]   │
├─────────────────────────────────────┤
│  eScripts Manager                   │
│  Manage your electronic             │
│  prescriptions (Australia)          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📱 About eScripts           │   │
│  │ eScripts are digital        │   │
│  │ prescriptions used in       │   │
│  │ Australia. You receive an   │   │
│  │ SMS or email with a token.  │   │
│  │ [ Learn More ]              │   │
│  └─────────────────────────────┘   │
│                                     │
│  [  + Add eScript  ]                │
│                                     │
│  My eScripts                        │
│  ┌─────────────────────────────┐   │
│  │ Paracetamol 500mg    [×]    │   │
│  │ [ACTIVE]                    │   │
│  │                             │   │
│  │ Token Code:                 │   │
│  │ ABC123DEF456                │   │
│  │                             │   │
│  │ 👨‍⚕️ Dr. Smith              │   │
│  │ 🔄 Repeats: 4 / 5 remaining │   │
│  │ 📅 Expires: 31/12/2024      │   │
│  │ Added: 15/01/2024           │   │
│  │                             │   │
│  │ [ Mark Repeat Used ]        │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Ibuprofen 200mg      [×]    │   │
│  │ [EXPIRED]                   │   │
│  │                             │   │
│  │ Token Code:                 │   │
│  │ XYZ789ABC012                │   │
│  │                             │   │
│  │ 🔄 Repeats: 0 / 3 remaining │   │
│  │ 📅 Expires: 01/01/2024      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Add eScript Form
```
┌─────────────────────────────────────┐
│  eScripts                     [=]   │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Add New eScript             │   │
│  │                             │   │
│  │ Token Code *                │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ Enter eScript token     │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Medication Name *           │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ e.g., Paracetamol 500mg │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Prescriber                  │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ Doctor's name           │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Number of Repeats           │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ 5                       │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ Expiry Date                 │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ DD/MM/YYYY              │ │   │
│  │ └─────────────────────────┘ │   │
│  │                             │   │
│  │ [ Cancel ]    [ Save ]      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 🔔 Notification Example

```
┌─────────────────────────────────────┐
│  Notification                       │
├─────────────────────────────────────┤
│  💊 Medication Reminder             │
│                                     │
│  Time to take Paracetamol (500mg)  │
│                                     │
│  [Open App]    [Dismiss]            │
└─────────────────────────────────────┘
```

---

## 🎨 Color Scheme Visual

```
Primary Blue (#4A90E2):
████████████ Used for buttons, actions, links

Success Green (#4CAF50):
████████████ Used for positive actions, low severity

Warning Yellow (#FFC107):
████████████ Used for moderate alerts, medium severity

Error Red (#F44336):
████████████ Used for delete actions, high severity

Background (#F5F5F5):
████████████ Light gray background

Cards (#FFFFFF):
████████████ White cards and containers
```

---

## 📊 Data Flow Diagram

```
User Input
    ↓
Screen Component
    ↓
Validation
    ↓
Service Layer
    ↓
AsyncStorage / Notification API
    ↓
Data Persisted / Notification Scheduled
    ↓
Screen Updates
    ↓
User Sees Confirmation
```

---

## 🔄 User Journey Examples

### Journey 1: Track a Symptom
```
Home → Tap Symptoms Tab → Tap "Add Symptom" 
→ Enter Details → Tap Save → See in History
```

### Journey 2: Set Medication Reminder
```
Home → Tap Medications Tab → Tap "Add Medication"
→ Enter Details → Set Time → Tap Save 
→ Grant Notification Permission → Reminder Set
```

### Journey 3: Add eScript
```
Receive SMS → Open Medley → Tap eScripts Tab
→ Tap "Add eScript" → Enter Token → Tap Save
→ Use at Pharmacy
```

---

**Note**: Actual app appearance may vary. These are text-based representations of the UI layout and flow.

For actual screenshots, run the app and take screenshots on your device/simulator.

---

**Next**: See [QUICKSTART.md](./QUICKSTART.md) to run the app and see the real UI!
