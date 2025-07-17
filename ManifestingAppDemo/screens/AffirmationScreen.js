import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AffirmationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>​​​🪧​ Questa è la schermata delle Affermazioni</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
