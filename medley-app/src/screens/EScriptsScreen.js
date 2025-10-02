import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import {StorageService} from '../services/StorageService';

const EScriptsScreen = () => {
  const [scripts, setScripts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [tokenCode, setTokenCode] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [prescriber, setPrescriber] = useState('');
  const [repeats, setRepeats] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    loadScripts();
  }, []);

  const loadScripts = async () => {
    const savedScripts = await StorageService.getEScripts();
    setScripts(savedScripts);
  };

  const addScript = async () => {
    if (!tokenCode.trim()) {
      Alert.alert('Error', 'Please enter a token code');
      return;
    }

    if (!medicationName.trim()) {
      Alert.alert('Error', 'Please enter a medication name');
      return;
    }

    const newScript = {
      id: Date.now().toString(),
      tokenCode: tokenCode.trim(),
      medicationName: medicationName.trim(),
      prescriber: prescriber.trim(),
      repeats: repeats.trim() || '0',
      remainingRepeats: repeats.trim() || '0',
      expiryDate: expiryDate.trim(),
      addedDate: new Date().toISOString(),
      status: 'active',
    };

    const updatedScripts = [...scripts, newScript];
    await StorageService.saveEScripts(updatedScripts);
    setScripts(updatedScripts);

    // Reset form
    setTokenCode('');
    setMedicationName('');
    setPrescriber('');
    setRepeats('');
    setExpiryDate('');
    setShowForm(false);

    Alert.alert('Success', 'eScript added successfully');
  };

  const deleteScript = async id => {
    Alert.alert(
      'Delete eScript',
      'Are you sure you want to delete this eScript?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedScripts = scripts.filter(s => s.id !== id);
            await StorageService.saveEScripts(updatedScripts);
            setScripts(updatedScripts);
          },
        },
      ],
    );
  };

  const markAsUsed = async id => {
    const script = scripts.find(s => s.id === id);
    if (!script) return;

    const remaining = parseInt(script.remainingRepeats);
    if (remaining <= 0) {
      Alert.alert('Error', 'No repeats remaining');
      return;
    }

    const updatedScripts = scripts.map(s => {
      if (s.id === id) {
        const newRemaining = remaining - 1;
        return {
          ...s,
          remainingRepeats: newRemaining.toString(),
          status: newRemaining === 0 ? 'expired' : 'active',
        };
      }
      return s;
    });

    await StorageService.saveEScripts(updatedScripts);
    setScripts(updatedScripts);

    Alert.alert('Success', 'Repeat marked as used');
  };

  const openEScriptPortal = () => {
    // Australian eScript portal
    Linking.openURL('https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescribing');
  };

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'expired':
        return '#F44336';
      default:
        return '#FFC107';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>eScripts Manager</Text>
          <Text style={styles.subHeaderText}>
            Manage your electronic prescriptions (Australia)
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📱 About eScripts</Text>
          <Text style={styles.infoText}>
            eScripts (electronic prescriptions) are digital versions of paper
            prescriptions used in Australia. You receive an SMS or email with
            a token code that you can use at any pharmacy.
          </Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={openEScriptPortal}>
            <Text style={styles.infoButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {showForm ? (
          <View style={styles.form}>
            <Text style={styles.formTitle}>Add New eScript</Text>

            <Text style={styles.label}>Token Code *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your eScript token code"
              value={tokenCode}
              onChangeText={setTokenCode}
              autoCapitalize="characters"
            />

            <Text style={styles.label}>Medication Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Paracetamol 500mg"
              value={medicationName}
              onChangeText={setMedicationName}
            />

            <Text style={styles.label}>Prescriber</Text>
            <TextInput
              style={styles.input}
              placeholder="Doctor's name"
              value={prescriber}
              onChangeText={setPrescriber}
            />

            <Text style={styles.label}>Number of Repeats</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 5"
              value={repeats}
              onChangeText={setRepeats}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowForm(false);
                  setTokenCode('');
                  setMedicationName('');
                  setPrescriber('');
                  setRepeats('');
                  setExpiryDate('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={addScript}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}>
            <Text style={styles.addButtonText}>+ Add eScript</Text>
          </TouchableOpacity>
        )}

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>My eScripts</Text>
          {scripts.length > 0 ? (
            scripts.map(script => (
              <View key={script.id} style={styles.scriptCard}>
                <View style={styles.scriptHeader}>
                  <View style={styles.scriptInfo}>
                    <Text style={styles.scriptMedication}>
                      {script.medicationName}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {backgroundColor: getStatusColor(script.status)},
                      ]}>
                      <Text style={styles.statusText}>
                        {script.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteScript(script.id)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.tokenContainer}>
                  <Text style={styles.tokenLabel}>Token Code:</Text>
                  <Text style={styles.tokenCode}>{script.tokenCode}</Text>
                </View>

                {script.prescriber && (
                  <Text style={styles.scriptDetail}>
                    👨‍⚕️ Prescriber: {script.prescriber}
                  </Text>
                )}

                <Text style={styles.scriptDetail}>
                  🔄 Repeats: {script.remainingRepeats} / {script.repeats} remaining
                </Text>

                {script.expiryDate && (
                  <Text style={styles.scriptDetail}>
                    📅 Expires: {script.expiryDate}
                  </Text>
                )}

                <Text style={styles.scriptDate}>
                  Added: {new Date(script.addedDate).toLocaleDateString()}
                </Text>

                {script.status === 'active' &&
                  parseInt(script.remainingRepeats) > 0 && (
                    <TouchableOpacity
                      style={styles.useButton}
                      onPress={() => markAsUsed(script.id)}>
                      <Text style={styles.useButtonText}>Mark Repeat Used</Text>
                    </TouchableOpacity>
                  )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No eScripts saved yet</Text>
              <Text style={styles.emptySubtext}>
                Add your electronic prescriptions to keep track of them
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
  infoCard: {
    backgroundColor: '#E3F2FD',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  infoButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
  scriptCard: {
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
  scriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  scriptInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scriptMedication: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#F44336',
  },
  tokenContainer: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tokenLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  tokenCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    fontFamily: 'monospace',
  },
  scriptDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  scriptDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  useButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  useButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
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

export default EScriptsScreen;
