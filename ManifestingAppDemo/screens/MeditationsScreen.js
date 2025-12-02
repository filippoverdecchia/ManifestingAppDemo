import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

const formatDuration = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}m ${seconds}s`;
};

export default function MeditationsScreen() {
  const { meditations, user } = useAppContext();
  const [category, setCategory] = useState('');
  const [playing, setPlaying] = useState(null);

  const categories = useMemo(() => ['Tutte', ...new Set(meditations.map((m) => m.category))], [meditations]);

  const filtered = useMemo(
    () => meditations.filter((m) => (category ? m.category === category : true)),
    [meditations, category]
  );

  const renderItem = ({ item }) => {
    const locked = item.isPremium && !user.isPremium;
    const isPlaying = playing === item.id;
    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>
          <Text style={styles.meta}>{formatDuration(item.durationSec)}</Text>
        </View>
        {locked ? (
          <Text style={styles.locked}>Premium</Text>
        ) : (
          <TouchableOpacity
            style={[styles.button, isPlaying ? styles.buttonSecondary : styles.buttonPrimary]}
            onPress={() => setPlaying(isPlaying ? null : item.id)}
          >
            <Text style={styles.buttonText}>{isPlaying ? 'Pausa' : 'Play'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Meditazioni</Text>
      <Text style={styles.pageSubtitle}>Seleziona una categoria o riproduci una sessione rapida.</Text>

      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => setCategory(cat === 'Tutte' ? '' : cat)}>
            <Text style={[styles.categoryChip, category === cat || (!category && cat === 'Tutte') ? styles.categoryActive : null]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={<Text>Nessuna meditazione trovata.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7fb', paddingHorizontal: 16, paddingTop: 16 },
  pageTitle: { fontSize: 28, fontWeight: '800', marginBottom: 6 },
  pageSubtitle: { color: '#555', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 12,
  },
  title: { fontSize: 16, fontWeight: '700' },
  subtitle: { color: '#555', marginTop: 2 },
  meta: { color: '#777', marginTop: 4 },
  locked: { color: '#a12d2d', fontWeight: '700', alignSelf: 'center' },
  button: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, alignSelf: 'center' },
  buttonPrimary: { backgroundColor: '#3c348b' },
  buttonSecondary: { backgroundColor: '#e0e7ff' },
  buttonText: { color: '#fff', fontWeight: '700' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#eaeaea',
    marginBottom: 6,
  },
  categoryActive: { backgroundColor: '#d8d6ff', color: '#3c348b', fontWeight: '700' },
});
