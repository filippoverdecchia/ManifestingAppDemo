import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  affirmationsSeed,
  meditationsSeed,
  diarySeed,
  eventsSeed,
  crystalsSeed,
  horoscopeSeed,
  moonPhaseSeed,
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    uid: 'demo_user',
    displayName: 'Ospite',
    isPremium: false,
    locale: 'it',
    settings: { notificationsEnabled: true, reminderTime: '08:00', dailyAffirmation: true },
  });
  const [affirmations, setAffirmations] = useState(affirmationsSeed);
  const [favorites, setFavorites] = useState(['aff_001']);
  const [diaryEntries, setDiaryEntries] = useState(diarySeed);
  const [events, setEvents] = useState(eventsSeed);
  const [meditations, setMeditations] = useState(meditationsSeed);
  const [crystals] = useState(crystalsSeed);

  const dailyAffirmation = useMemo(() => {
    const available = affirmations.filter((item) => user.isPremium || !item.isPremium);
    if (available.length === 0) return null;
    const seed = new Date().getDate();
    const index = seed % available.length;
    return available[index];
  }, [affirmations, user.isPremium]);

  const toggleFavoriteAffirmation = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const addAffirmation = (text, category) => {
    if (!text) return;
    const newAff = {
      id: `aff_${Date.now()}`,
      text,
      category: category || 'Personale',
      language: user.locale,
      isPremium: false,
    };
    setAffirmations((prev) => [newAff, ...prev]);
  };

  const addDiaryEntry = (text, mood, tags = []) => {
    if (!text) return;
    const newEntry = {
      id: `entry_${Date.now()}`,
      text,
      mood: Number(mood) || 3,
      tags,
      createdAt: new Date().toISOString(),
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);
  };

  const addEvent = (title, dateISO, notification = false) => {
    if (!title || !dateISO) return;
    const newEvent = {
      id: `evt_${Date.now()}`,
      title,
      dateISO,
      notification,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const togglePremium = () => {
    setUser((prev) => ({ ...prev, isPremium: !prev.isPremium }));
  };

  const value = {
    user,
    setUser,
    affirmations,
    favorites,
    diaryEntries,
    events,
    meditations,
    crystals,
    horoscope: horoscopeSeed,
    moonPhase: moonPhaseSeed,
    dailyAffirmation,
    toggleFavoriteAffirmation,
    addAffirmation,
    addDiaryEntry,
    addEvent,
    togglePremium,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
