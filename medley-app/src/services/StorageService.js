import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SYMPTOMS: '@medley_symptoms',
  MOODS: '@medley_moods',
  MEDICATIONS: '@medley_medications',
  ESCRIPTS: '@medley_escripts',
};

export class StorageService {
  // Symptoms
  static async getSymptoms() {
    try {
      const data = await AsyncStorage.getItem(KEYS.SYMPTOMS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading symptoms:', error);
      return [];
    }
  }

  static async saveSymptoms(symptoms) {
    try {
      await AsyncStorage.setItem(KEYS.SYMPTOMS, JSON.stringify(symptoms));
    } catch (error) {
      console.error('Error saving symptoms:', error);
      throw error;
    }
  }

  // Moods
  static async getMoods() {
    try {
      const data = await AsyncStorage.getItem(KEYS.MOODS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading moods:', error);
      return [];
    }
  }

  static async saveMoods(moods) {
    try {
      await AsyncStorage.setItem(KEYS.MOODS, JSON.stringify(moods));
    } catch (error) {
      console.error('Error saving moods:', error);
      throw error;
    }
  }

  // Medications
  static async getMedications() {
    try {
      const data = await AsyncStorage.getItem(KEYS.MEDICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading medications:', error);
      return [];
    }
  }

  static async saveMedications(medications) {
    try {
      await AsyncStorage.setItem(
        KEYS.MEDICATIONS,
        JSON.stringify(medications),
      );
    } catch (error) {
      console.error('Error saving medications:', error);
      throw error;
    }
  }

  // eScripts
  static async getEScripts() {
    try {
      const data = await AsyncStorage.getItem(KEYS.ESCRIPTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading eScripts:', error);
      return [];
    }
  }

  static async saveEScripts(scripts) {
    try {
      await AsyncStorage.setItem(KEYS.ESCRIPTS, JSON.stringify(scripts));
    } catch (error) {
      console.error('Error saving eScripts:', error);
      throw error;
    }
  }

  // Clear all data (for testing or reset)
  static async clearAll() {
    try {
      await AsyncStorage.multiRemove(Object.values(KEYS));
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}
