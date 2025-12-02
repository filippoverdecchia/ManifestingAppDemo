import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import AffirmationsScreen from './screens/AffirmationsScreen';
import MeditationsScreen from './screens/MeditationsScreen';
import DiaryScreen from './screens/DiaryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendario" component={CalendarScreen} />
        <Stack.Screen name="Affermazioni" component={AffirmationsScreen} />
        <Stack.Screen name="Meditazioni" component={MeditationsScreen} />
        <Stack.Screen name="Diario" component={DiaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
