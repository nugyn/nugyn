import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SymptomsScreen from '../screens/SymptomsScreen';
import MoodScreen from '../screens/MoodScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import EScriptsScreen from '../screens/EScriptsScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: 'Medley',
        }}
      />
      <Tab.Screen
        name="Symptoms"
        component={SymptomsScreen}
        options={{
          tabBarLabel: 'Symptoms',
          title: 'Symptom Tracker',
        }}
      />
      <Tab.Screen
        name="Mood"
        component={MoodScreen}
        options={{
          tabBarLabel: 'Mood',
          title: 'Mood Monitor',
        }}
      />
      <Tab.Screen
        name="Medications"
        component={MedicationsScreen}
        options={{
          tabBarLabel: 'Medications',
          title: 'Medications',
        }}
      />
      <Tab.Screen
        name="EScripts"
        component={EScriptsScreen}
        options={{
          tabBarLabel: 'eScripts',
          title: 'eScripts',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
