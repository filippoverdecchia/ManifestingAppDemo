import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const SectionCard = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

export default function HomeScreen() {
  const navigation = useNavigation();
  const { dailyAffirmation, horoscope, moonPhase, meditations, user } = useAppContext();

  const featuredMeditations = meditations.slice(0, 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌟 Manifesting</Text>
      <Text style={styles.subtitle}>Benvenuto{user.displayName ? `, ${user.displayName}` : ''}</Text>

      <SectionCard title="✨ Messaggio del giorno">
        {dailyAffirmation ? (
          <>
            <Text style={styles.cardHighlight}>{dailyAffirmation.text}</Text>
            <Text style={styles.pill}>{dailyAffirmation.category}</Text>
          </>
        ) : (
          <Text>Nessuna affermazione disponibile.</Text>
        )}
      </SectionCard>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigation.navigate('Diary')}>
          <Text style={styles.quickLabel}>Diario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigation.navigate('Meditations')}>
          <Text style={styles.quickLabel}>Meditazioni</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigation.navigate('Affirmations')}>
          <Text style={styles.quickLabel}>Affermazioni</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.quickLabel}>Calendario</Text>
        </TouchableOpacity>
      </View>

      <SectionCard title="🎧 Meditazioni in evidenza">
        {featuredMeditations.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.description}</Text>
            </View>
            {item.isPremium && <Text style={styles.locked}>Premium</Text>}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="🔮 Oroscopo del giorno">
        <Text style={styles.itemTitle}>{horoscope.sign}</Text>
        <Text style={styles.itemSubtitle}>{horoscope.title}</Text>
        <Text>{horoscope.message}</Text>
      </SectionCard>

      <SectionCard title="🌙 Fase lunare">
        <Text style={styles.itemTitle}>{moonPhase.name}</Text>
        <Text>{moonPhase.meaning}</Text>
      </SectionCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f7f7fb',
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b6b6b',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardHighlight: {
    fontSize: 16,
    fontWeight: '600',
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8ddff',
    color: '#4b2fb3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '700',
    fontSize: 12,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  quickButton: {
    backgroundColor: '#d8d6ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '48%',
  },
  quickLabel: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#3c348b',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemSubtitle: {
    color: '#555',
    marginTop: 2,
  },
  locked: {
    color: '#a12d2d',
    fontWeight: '700',
  },
});
