export default function HomeScreen() {
  return (
    import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  // ...
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌟 Manifesting</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>✨ Messaggio del giorno</Text>
        <Text style={styles.cardContent}>Credi in te stesso, ogni giorno è un'opportunità!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔮 Oroscopo</Text>
        <Text style={styles.cardContent}>Bilancia: Oggi sei in perfetto equilibrio, continua così.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendario')}>
        <Text style={styles.buttonText}>Apri calendario</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Affermazioni')}>
        <Text style={styles.buttonText}>Apri Affermazioni</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meditazioni')}>
        <Text style={styles.buttonText}>Apri Meditazioni</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Diario')}>
        <Text style={styles.buttonText}>Apri Diario</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#f3f3f3',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#b388ff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

  );
}
