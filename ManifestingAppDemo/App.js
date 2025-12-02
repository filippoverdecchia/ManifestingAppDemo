import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AffirmationsScreen from './screens/AffirmationsScreen';
import MeditationsScreen from './screens/MeditationsScreen';
import DiaryScreen from './screens/DiaryScreen';
import CalendarScreen from './screens/CalendarScreen';
import { AppProvider } from './context/AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerTitleAlign: 'center', headerBackTitle: 'Indietro' }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Manifesting' }} />
          <Stack.Screen name="Affirmations" component={AffirmationsScreen} options={{ title: 'Affermazioni' }} />
          <Stack.Screen name="Meditations" component={MeditationsScreen} options={{ title: 'Meditazioni' }} />
          <Stack.Screen name="Diary" component={DiaryScreen} options={{ title: 'Diario' }} />
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendario' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
