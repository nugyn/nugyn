import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

export class NotificationService {
  static initialize() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: 'medley-medications',
        channelName: 'Medication Reminders',
        channelDescription: 'Reminders for taking medications',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );
  }

  static async scheduleMedicationReminder(medication) {
    try {
      // Cancel any existing notification for this medication
      await this.cancelMedicationReminder(medication.id);

      // Parse the time
      const [hours, minutes] = medication.time.split(':').map(Number);
      const now = new Date();
      const scheduledDate = new Date(now);
      scheduledDate.setHours(hours, minutes, 0, 0);

      // If the time has already passed today, schedule for tomorrow
      if (scheduledDate < now) {
        scheduledDate.setDate(scheduledDate.getDate() + 1);
      }

      const notificationId = parseInt(medication.id);

      PushNotification.localNotificationSchedule({
        channelId: 'medley-medications',
        id: notificationId,
        title: '💊 Medication Reminder',
        message: `Time to take ${medication.name} (${medication.dosage})`,
        date: scheduledDate,
        allowWhileIdle: true,
        repeatType: this.getRepeatType(medication.frequency),
        playSound: true,
        soundName: 'default',
        vibrate: true,
        vibration: 300,
        data: {
          medicationId: medication.id,
          type: 'medication',
        },
      });

      console.log(
        `Scheduled notification for ${medication.name} at ${scheduledDate}`,
      );
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  static async cancelMedicationReminder(medicationId) {
    try {
      const notificationId = parseInt(medicationId);
      PushNotification.cancelLocalNotification(notificationId);
      console.log(`Cancelled notification for medication ${medicationId}`);
    } catch (error) {
      console.error('Error cancelling notification:', error);
    }
  }

  static getRepeatType(frequency) {
    switch (frequency) {
      case 'daily':
        return 'day';
      case 'twice_daily':
        return 'day'; // Will need to schedule two separate notifications
      case 'weekly':
        return 'week';
      case 'as_needed':
        return null;
      default:
        return 'day';
    }
  }

  static async cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  static async getScheduledNotifications() {
    return new Promise(resolve => {
      PushNotification.getScheduledLocalNotifications(notifications => {
        resolve(notifications);
      });
    });
  }
}
