import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

const AffirmationItem = ({ item, isFavorite, onFavorite, locked }) => (
  <View style={styles.itemRow}>
    <View style={{ flex: 1 }}>
      <Text style={styles.itemText}>{item.text}</Text>
      <View style={styles.itemMeta}>
        <Text style={styles.chip}>{item.category}</Text>
        {locked && <Text style={styles.locked}>Premium</Text>}
      </View>
    </View>
    <TouchableOpacity style={styles.favoriteButton} onPress={() => onFavorite(item.id)}>
      <Text style={{ color: isFavorite ? '#b22d8a' : '#555' }}>{isFavorite ? '★' : '☆'}</Text>
    </TouchableOpacity>
  </View>
);

export default function AffirmationsScreen() {
  const { affirmations, favorites, toggleFavoriteAffirmation, addAffirmation, user } = useAppContext();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [newAffirmation, setNewAffirmation] = useState('');
  const [newCategory, setNewCategory] = useState('Personale');

  const filtered = useMemo(() => {
    return affirmations.filter((item) => {
      const matchesQuery = item.text.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category ? item.category === category : true;
      return matchesQuery && matchesCategory;
    });
  }, [affirmations, query, category]);

  const categories = useMemo(() => ['Tutte', ...new Set(affirmations.map((a) => a.category))], [affirmations]);

  const renderItem = ({ item }) => {
    const locked = item.isPremium && !user.isPremium;
    return (
      <AffirmationItem
        item={item}
        isFavorite={favorites.includes(item.id)}
        locked={locked}
        onFavorite={(id) => !locked && toggleFavoriteAffirmation(id)}
      />
    );
  };

  const handleAdd = () => {
    addAffirmation(newAffirmation.trim(), newCategory.trim());
    setNewAffirmation('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Affermazioni</Text>
      <Text style={styles.subtitle}>Cerca, filtra e aggiungi le tue frasi personali.</Text>

      <TextInput
        placeholder="Cerca una affermazione"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text>Nessuna affermazione trovata.</Text>}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      <View style={styles.addCard}>
        <Text style={styles.addTitle}>Aggiungi la tua</Text>
        <TextInput
          placeholder="Scrivi la tua affermazione"
          value={newAffirmation}
          onChangeText={setNewAffirmation}
          style={styles.input}
        />
        <TextInput
          placeholder="Categoria"
          value={newCategory}
          onChangeText={setNewCategory}
          style={styles.input}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleAdd}>
          <Text style={styles.primaryText}>Salva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7fb', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#555', marginBottom: 12 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ececec',
    marginBottom: 10,
  },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#eaeaea',
    marginBottom: 6,
  },
  categoryActive: { backgroundColor: '#d8d6ff', color: '#3c348b', fontWeight: '700' },
  itemRow: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },
  itemText: { fontSize: 16, fontWeight: '600' },
  itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  chip: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    color: '#3c348b',
    fontWeight: '700',
    fontSize: 12,
  },
  locked: { color: '#a12d2d', fontWeight: '700' },
  favoriteButton: { paddingHorizontal: 8, justifyContent: 'center' },
  separator: { height: 10 },
  addCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  addTitle: { fontSize: 18, fontWeight: '700' },
  primaryButton: {
    backgroundColor: '#3c348b',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
});
