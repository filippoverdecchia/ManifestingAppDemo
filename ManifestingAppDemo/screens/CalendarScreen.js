import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useAppContext } from '../context/AppContext';

const formatDate = (iso) => new Date(iso).toLocaleString();

export default function CalendarScreen() {
  const { events, addEvent, moonPhase } = useAppContext();
  const [title, setTitle] = useState('');
  const [dateISO, setDateISO] = useState(new Date().toISOString());
  const [notification, setNotification] = useState(true);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO)),
    [events]
  );

  const handleAdd = () => {
    addEvent(title.trim(), dateISO, notification);
    setTitle('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.meta}>{formatDate(item.dateISO)}</Text>
      {item.notification && <Text style={styles.tag}>🔔 Notifica attiva</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario</Text>
      <Text style={styles.subtitle}>Pianifica sessioni, promemoria e rituali lunari.</Text>

      <View style={styles.moonCard}>
        <Text style={styles.moonTitle}>🌙 {moonPhase.name}</Text>
        <Text style={styles.meta}>{moonPhase.meaning}</Text>
      </View>

      <TextInput
        placeholder="Titolo dell'evento"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Data ISO (es. 2025-05-20T18:00:00Z)"
        value={dateISO}
        onChangeText={setDateISO}
        style={styles.input}
      />
      <View style={styles.switchRow}>
        <Text>Invia notifica</Text>
        <Switch value={notification} onValueChange={setNotification} />
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={handleAdd}>
        <Text style={styles.primaryText}>Aggiungi evento</Text>
      </TouchableOpacity>

      <FlatList
        data={sortedEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={<Text>Nessun evento pianificato.</Text>}
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
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 14, gap: 6 },
  eventTitle: { fontSize: 16, fontWeight: '700' },
  meta: { color: '#777' },
  tag: { backgroundColor: '#e8ddff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, color: '#3c348b', alignSelf: 'flex-start' },
  moonCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: '#ececec',
    marginBottom: 12,
  },
  moonTitle: { fontSize: 16, fontWeight: '700' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
});
