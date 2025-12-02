import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

const formatDate = (iso) => new Date(iso).toLocaleString();

export default function DiaryScreen() {
  const { diaryEntries, addDiaryEntry } = useAppContext();
  const [text, setText] = useState('');
  const [mood, setMood] = useState('3');
  const [tags, setTags] = useState('gratitudine');

  const sortedEntries = useMemo(
    () => [...diaryEntries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [diaryEntries]
  );

  const handleSave = () => {
    addDiaryEntry(text.trim(), mood, tags.split(',').map((t) => t.trim()).filter(Boolean));
    setText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.entryText}>{item.text}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>Umore: {item.mood}/5</Text>
        <Text style={styles.meta}>{formatDate(item.createdAt)}</Text>
      </View>
      <View style={styles.tagRow}>
        {item.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            #{tag}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diario</Text>
      <Text style={styles.subtitle}>Aggiungi pensieri, gratitudine o manifestazioni raggiunte.</Text>

      <TextInput
        placeholder="Scrivi qui il tuo pensiero"
        value={text}
        onChangeText={setText}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <TextInput
        placeholder="Umore da 1 a 5"
        keyboardType="numeric"
        value={mood}
        onChangeText={setMood}
        style={styles.input}
      />
      <TextInput
        placeholder="Tag separati da virgola"
        value={tags}
        onChangeText={setTags}
        style={styles.input}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryText}>Salva</Text>
      </TouchableOpacity>

      <FlatList
        data={sortedEntries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={<Text>Nessuna nota presente.</Text>}
      />
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
  primaryButton: {
    backgroundColor: '#3c348b',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    gap: 8,
  },
  entryText: { fontSize: 16, fontWeight: '600' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  meta: { color: '#777', fontSize: 12 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { backgroundColor: '#e8ddff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, color: '#3c348b' },
});
