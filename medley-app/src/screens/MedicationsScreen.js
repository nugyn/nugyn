import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {StorageService} from '../services/StorageService';
import {NotificationService} from '../services/NotificationService';

const MedicationsScreen = () => {
  const [medications, setMedications] = useState([]);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    const savedMedications = await StorageService.getMedications();
    setMedications(savedMedications);
  };

  const addMedication = async () => {
    if (!medicationName.trim()) {
      Alert.alert('Error', 'Please enter a medication name');
      return;
    }

    if (!dosage.trim()) {
      Alert.alert('Error', 'Please enter a dosage');
      return;
    }

    const newMedication = {
      id: Date.now().toString(),
      name: medicationName.trim(),
      dosage: dosage.trim(),
      frequency,
      time,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      nextDose: calculateNextDose(frequency, time),
      reminderEnabled: true,
    };

    const updatedMedications = [...medications, newMedication];
    await StorageService.saveMedications(updatedMedications);
    setMedications(updatedMedications);

    // Schedule notification
    await NotificationService.scheduleMedicationReminder(newMedication);

    // Reset form
    setMedicationName('');
    setDosage('');
    setFrequency('daily');
    setTime('09:00');
    setNotes('');
    setShowForm(false);

    Alert.alert('Success', 'Medication added and reminder set');
  };

  const calculateNextDose = (freq, timeStr) => {
    const now = new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const nextDose = new Date(now);
    nextDose.setHours(hours, minutes, 0, 0);

    if (nextDose < now) {
      nextDose.setDate(nextDose.getDate() + 1);
    }

    return nextDose.toISOString();
  };

  const deleteMedication = async id => {
    Alert.alert(
      'Delete Medication',
      'Are you sure you want to delete this medication and its reminders?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const medication = medications.find(m => m.id === id);
            if (medication) {
              await NotificationService.cancelMedicationReminder(medication.id);
            }
            const updatedMedications = medications.filter(m => m.id !== id);
            await StorageService.saveMedications(updatedMedications);
            setMedications(updatedMedications);
          },
        },
      ],
    );
  };

  const markAsTaken = async id => {
    const medication = medications.find(m => m.id === id);
    if (!medication) return;

    const takenLog = {
      medicationId: id,
      takenAt: new Date().toISOString(),
    };

    // Update next dose time
    const updatedMedications = medications.map(med => {
      if (med.id === id) {
        const nextDose = calculateNextDose(med.frequency, med.time);
        return {...med, nextDose, lastTaken: takenLog.takenAt};
      }
      return med;
    });

    await StorageService.saveMedications(updatedMedications);
    setMedications(updatedMedications);

    // Reschedule notification
    const updatedMed = updatedMedications.find(m => m.id === id);
    if (updatedMed) {
      await NotificationService.scheduleMedicationReminder(updatedMed);
    }

    Alert.alert('Success', 'Medication marked as taken');
  };

  const getFrequencyLabel = freq => {
    const labels = {
      daily: 'Daily',
      twice_daily: 'Twice Daily',
      weekly: 'Weekly',
      as_needed: 'As Needed',
    };
    return labels[freq] || freq;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Manage Medications</Text>
          <Text style={styles.subHeaderText}>
            Set reminders and track your medications
          </Text>
        </View>

        {showForm ? (
          <View style={styles.form}>
            <Text style={styles.formTitle}>Add New Medication</Text>

            <Text style={styles.label}>Medication Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Paracetamol, Ibuprofen"
              value={medicationName}
              onChangeText={setMedicationName}
            />

            <Text style={styles.label}>Dosage *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 500mg, 1 tablet"
              value={dosage}
              onChangeText={setDosage}
            />

            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyButtons}>
              {[
                {value: 'daily', label: 'Daily'},
                {value: 'twice_daily', label: 'Twice Daily'},
                {value: 'weekly', label: 'Weekly'},
                {value: 'as_needed', label: 'As Needed'},
              ].map(freq => (
                <TouchableOpacity
                  key={freq.value}
                  style={[
                    styles.frequencyButton,
                    frequency === freq.value && styles.frequencyButtonSelected,
                  ]}
                  onPress={() => setFrequency(freq.value)}>
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      frequency === freq.value &&
                        styles.frequencyButtonTextSelected,
                    ]}>
                    {freq.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Reminder Time</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM (24-hour format)"
              value={time}
              onChangeText={setTime}
            />

            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Special instructions..."
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
                  setMedicationName('');
                  setDosage('');
                  setFrequency('daily');
                  setTime('09:00');
                  setNotes('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={addMedication}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}>
            <Text style={styles.addButtonText}>+ Add Medication</Text>
          </TouchableOpacity>
        )}

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>My Medications</Text>
          {medications.length > 0 ? (
            medications.map(medication => (
              <View key={medication.id} style={styles.medicationCard}>
                <View style={styles.medicationHeader}>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>
                      {medication.name}
                    </Text>
                    <Text style={styles.medicationDosage}>
                      {medication.dosage}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteMedication(medication.id)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.medicationDetails}>
                  <Text style={styles.detailText}>
                    📅 {getFrequencyLabel(medication.frequency)}
                  </Text>
                  <Text style={styles.detailText}>⏰ {medication.time}</Text>
                </View>

                {medication.notes && (
                  <Text style={styles.medicationNotes}>
                    {medication.notes}
                  </Text>
                )}

                <View style={styles.nextDoseContainer}>
                  <Text style={styles.nextDoseLabel}>Next dose:</Text>
                  <Text style={styles.nextDoseTime}>
                    {new Date(medication.nextDose).toLocaleString()}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.takenButton}
                  onPress={() => markAsTaken(medication.id)}>
                  <Text style={styles.takenButtonText}>✓ Mark as Taken</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No medications added yet</Text>
              <Text style={styles.emptySubtext}>
                Add medications to set up reminders
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
  frequencyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  frequencyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  frequencyButtonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  frequencyButtonText: {
    fontSize: 14,
    color: '#666',
  },
  frequencyButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  medicationCard: {
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
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationDosage: {
    fontSize: 16,
    color: '#4A90E2',
    marginTop: 2,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#F44336',
  },
  medicationDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  medicationNotes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  nextDoseContainer: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  nextDoseLabel: {
    fontSize: 12,
    color: '#666',
  },
  nextDoseTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginTop: 2,
  },
  takenButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  takenButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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

export default MedicationsScreen;
