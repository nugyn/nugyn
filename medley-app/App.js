import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import {NotificationService} from './src/services/NotificationService';

const App = () => {
  React.useEffect(() => {
    NotificationService.initialize();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
