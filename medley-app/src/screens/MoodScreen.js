import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {StorageService} from '../services/StorageService';

const MOODS = [
  {emoji: '😊', label: 'Great', value: 5},
  {emoji: '🙂', label: 'Good', value: 4},
  {emoji: '😐', label: 'Okay', value: 3},
  {emoji: '😟', label: 'Not Good', value: 2},
  {emoji: '😢', label: 'Bad', value: 1},
];

const MoodScreen = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMoods();
  }, []);

  const loadMoods = async () => {
    const savedMoods = await StorageService.getMoods();
    setMoods(savedMoods);
  };

  const saveMood = async () => {
    if (!selectedMood) {
      Alert.alert('Error', 'Please select a mood');
      return;
    }

    const newMood = {
      id: Date.now().toString(),
      mood: selectedMood.label,
      emoji: selectedMood.emoji,
      value: selectedMood.value,
      notes: notes.trim(),
      date: new Date().toISOString(),
    };

    const updatedMoods = [...moods, newMood];
    await StorageService.saveMoods(updatedMoods);
    setMoods(updatedMoods);

    // Reset form
    setSelectedMood(null);
    setNotes('');
    setShowForm(false);

    Alert.alert('Success', 'Mood recorded successfully');
  };

  const deleteMood = async id => {
    Alert.alert(
      'Delete Mood',
      'Are you sure you want to delete this mood entry?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedMoods = moods.filter(m => m.id !== id);
            await StorageService.saveMoods(updatedMoods);
            setMoods(updatedMoods);
          },
        },
      ],
    );
  };

  const getAverageMood = () => {
    if (moods.length === 0) return null;
    const sum = moods.reduce((acc, mood) => acc + mood.value, 0);
    return (sum / moods.length).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Track Your Mood</Text>
          <Text style={styles.subHeaderText}>
            Monitor your emotional well-being daily
          </Text>
          {moods.length > 0 && (
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                Average Mood: {getAverageMood()}/5
              </Text>
              <Text style={styles.statsText}>
                Total Entries: {moods.length}
              </Text>
            </View>
          )}
        </View>

        {showForm ? (
          <View style={styles.form}>
            <Text style={styles.formTitle}>How are you feeling?</Text>

            <View style={styles.moodSelector}>
              {MOODS.map(mood => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodButton,
                    selectedMood?.value === mood.value &&
                      styles.moodButtonSelected,
                  ]}
                  onPress={() => setSelectedMood(mood)}>
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="What's on your mind?"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowForm(false);
                  setSelectedMood(null);
                  setNotes('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={saveMood}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}>
            <Text style={styles.addButtonText}>+ Record Mood</Text>
          </TouchableOpacity>
        )}

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Mood History</Text>
          {moods.length > 0 ? (
            [...moods].reverse().map(mood => (
              <View key={mood.id} style={styles.moodCard}>
                <View style={styles.moodCardHeader}>
                  <View style={styles.moodInfo}>
                    <Text style={styles.moodCardEmoji}>{mood.emoji}</Text>
                    <View>
                      <Text style={styles.moodCardLabel}>{mood.mood}</Text>
                      <Text style={styles.moodCardDate}>
                        {new Date(mood.date).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteMood(mood.id)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                {mood.notes && (
                  <Text style={styles.moodNotes}>{mood.notes}</Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No moods recorded yet</Text>
              <Text style={styles.emptySubtext}>
                Start tracking to understand your emotional patterns
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  form: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  moodButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD',
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  moodCard: {
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
  moodCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodCardEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  moodCardLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moodCardDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#F44336',
  },
  moodNotes: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
    paddingLeft: 55,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
  },
});

export default MoodScreen;
