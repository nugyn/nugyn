import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StorageService} from '../services/StorageService';

const HomeScreen = ({navigation}) => {
  const [upcomingMedications, setUpcomingMedications] = useState([]);
  const [recentSymptoms, setRecentSymptoms] = useState([]);
  const [todayMood, setTodayMood] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const medications = await StorageService.getMedications();
      const symptoms = await StorageService.getSymptoms();
      const moods = await StorageService.getMoods();

      // Get upcoming medications (next 24 hours)
      const now = new Date();
      const upcoming = medications
        .filter(med => {
          const nextDose = new Date(med.nextDose);
          return nextDose > now && nextDose < new Date(now.getTime() + 24 * 60 * 60 * 1000);
        })
        .sort((a, b) => new Date(a.nextDose) - new Date(b.nextDose))
        .slice(0, 3);

      setUpcomingMedications(upcoming);

      // Get recent symptoms (last 3)
      const recent = symptoms.slice(-3).reverse();
      setRecentSymptoms(recent);

      // Get today's mood
      const today = moods.find(mood => {
        const moodDate = new Date(mood.date);
        return moodDate.toDateString() === now.toDateString();
      });
      setTodayMood(today);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to Medley</Text>
        <Text style={styles.subtitleText}>Your health companion</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Medications</Text>
        {upcomingMedications.length > 0 ? (
          upcomingMedications.map((med, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{med.name}</Text>
              <Text style={styles.cardSubtitle}>
                {med.dosage} - {new Date(med.nextDose).toLocaleString()}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No upcoming medications</Text>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Medications')}>
              <Text style={styles.linkText}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Mood</Text>
        {todayMood ? (
          <View style={styles.card}>
            <Text style={styles.moodEmoji}>{todayMood.emoji}</Text>
            <Text style={styles.cardTitle}>{todayMood.mood}</Text>
            {todayMood.notes && (
              <Text style={styles.cardSubtitle}>{todayMood.notes}</Text>
            )}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No mood recorded today</Text>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Mood')}>
              <Text style={styles.linkText}>Record Mood</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Symptoms</Text>
        {recentSymptoms.length > 0 ? (
          recentSymptoms.map((symptom, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{symptom.name}</Text>
              <Text style={styles.cardSubtitle}>
                Severity: {symptom.severity}/10 - {new Date(symptom.date).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No symptoms tracked</Text>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Symptoms')}>
              <Text style={styles.linkText}>Track Symptom</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('EScripts')}>
          <Text style={styles.actionButtonText}>View eScripts</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  welcomeSection: {
    backgroundColor: '#4A90E2',
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitleText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 5,
  },
  linkText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  moodEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
