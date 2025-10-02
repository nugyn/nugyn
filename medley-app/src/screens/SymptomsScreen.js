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

const SymptomsScreen = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [symptomName, setSymptomName] = useState('');
  const [severity, setSeverity] = useState('5');
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSymptoms();
  }, []);

  const loadSymptoms = async () => {
    const savedSymptoms = await StorageService.getSymptoms();
    setSymptoms(savedSymptoms);
  };

  const addSymptom = async () => {
    if (!symptomName.trim()) {
      Alert.alert('Error', 'Please enter a symptom name');
      return;
    }

    const newSymptom = {
      id: Date.now().toString(),
      name: symptomName.trim(),
      severity: parseInt(severity),
      notes: notes.trim(),
      date: new Date().toISOString(),
    };

    const updatedSymptoms = [...symptoms, newSymptom];
    await StorageService.saveSymptoms(updatedSymptoms);
    setSymptoms(updatedSymptoms);

    // Reset form
    setSymptomName('');
    setSeverity('5');
    setNotes('');
    setShowForm(false);

    Alert.alert('Success', 'Symptom tracked successfully');
  };

  const deleteSymptom = async id => {
    Alert.alert(
      'Delete Symptom',
      'Are you sure you want to delete this symptom entry?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedSymptoms = symptoms.filter(s => s.id !== id);
            await StorageService.saveSymptoms(updatedSymptoms);
            setSymptoms(updatedSymptoms);
          },
        },
      ],
    );
  };

  const getSeverityColor = severity => {
    if (severity <= 3) return '#4CAF50';
    if (severity <= 6) return '#FFC107';
    return '#F44336';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Track Your Symptoms</Text>
          <Text style={styles.subHeaderText}>
            Monitor your symptoms over time to identify patterns
          </Text>
        </View>

        {showForm ? (
          <View style={styles.form}>
            <Text style={styles.formTitle}>Add New Symptom</Text>

            <Text style={styles.label}>Symptom Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Headache, Nausea, Fatigue"
              value={symptomName}
              onChangeText={setSymptomName}
            />

            <Text style={styles.label}>Severity (1-10)</Text>
            <View style={styles.severityContainer}>
              <TextInput
                style={styles.severityInput}
                placeholder="5"
                value={severity}
                onChangeText={text => {
                  const num = parseInt(text);
                  if (text === '' || (num >= 1 && num <= 10)) {
                    setSeverity(text);
                  }
                }}
                keyboardType="numeric"
                maxLength={2}
              />
              <View style={styles.severityScale}>
                <Text style={styles.scaleLabel}>Mild</Text>
                <Text style={styles.scaleLabel}>Moderate</Text>
                <Text style={styles.scaleLabel}>Severe</Text>
              </View>
            </View>

            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Additional details..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowForm(false);
                  setSymptomName('');
                  setSeverity('5');
                  setNotes('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={addSymptom}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}>
            <Text style={styles.addButtonText}>+ Add Symptom</Text>
          </TouchableOpacity>
        )}

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Symptom History</Text>
          {symptoms.length > 0 ? (
            [...symptoms].reverse().map(symptom => (
              <View key={symptom.id} style={styles.symptomCard}>
                <View style={styles.symptomHeader}>
                  <Text style={styles.symptomName}>{symptom.name}</Text>
                  <TouchableOpacity
                    onPress={() => deleteSymptom(symptom.id)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.severityBar}>
                  <View
                    style={[
                      styles.severityFill,
                      {
                        width: `${symptom.severity * 10}%`,
                        backgroundColor: getSeverityColor(symptom.severity),
                      },
                    ]}
                  />
                  <Text style={styles.severityText}>
                    {symptom.severity}/10
                  </Text>
                </View>
                {symptom.notes && (
                  <Text style={styles.symptomNotes}>{symptom.notes}</Text>
                )}
                <Text style={styles.symptomDate}>
                  {new Date(symptom.date).toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No symptoms tracked yet</Text>
              <Text style={styles.emptySubtext}>
                Start tracking to monitor your health
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
    height: 80,
    textAlignVertical: 'top',
  },
  severityContainer: {
    marginBottom: 10,
  },
  severityInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  severityScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  scaleLabel: {
    fontSize: 12,
    color: '#666',
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
  symptomCard: {
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
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  symptomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#F44336',
  },
  severityBar: {
    height: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
    justifyContent: 'center',
  },
  severityFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  severityText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  symptomNotes: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  symptomDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
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

export default SymptomsScreen;
