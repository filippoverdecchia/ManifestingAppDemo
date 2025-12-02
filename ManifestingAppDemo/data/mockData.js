export const affirmationsSeed = [
  {
    id: 'aff_001',
    text: 'I attract abundance and joy into my life.',
    category: 'Abbondanza',
    language: 'en',
    isPremium: false,
  },
  {
    id: 'aff_002',
    text: "Credo in me stesso e nella mia visione.",
    category: 'Motivazione',
    language: 'it',
    isPremium: false,
  },
  {
    id: 'aff_003',
    text: 'Every breath grounds me in calm and clarity.',
    category: 'Calma',
    language: 'en',
    isPremium: true,
  },
  {
    id: 'aff_004',
    text: "L'universo sostiene i miei passi.",
    category: 'Spiritualità',
    language: 'it',
    isPremium: false,
  },
];

export const meditationsSeed = [
  {
    id: 'med_001',
    title: 'Deep Sleep Relaxation',
    description: 'Guided meditation to wind down and rest.',
    category: 'Sonno',
    durationSec: 900,
    isPremium: true,
  },
  {
    id: 'med_002',
    title: 'Morning Clarity',
    description: 'Start your day with focus.',
    category: 'Focus',
    durationSec: 600,
    isPremium: false,
  },
  {
    id: 'med_003',
    title: 'Respiro consapevole',
    description: 'Respiri guidati per riportare calma immediata.',
    category: 'Calma',
    durationSec: 420,
    isPremium: false,
  },
];

export const diarySeed = [
  {
    id: 'entry_001',
    text: 'Oggi ho ringraziato per tre cose semplici.',
    mood: 4,
    tags: ['gratitudine'],
    createdAt: new Date().toISOString(),
  },
];

export const eventsSeed = [
  {
    id: 'evt_001',
    title: 'Meditazione serale',
    dateISO: new Date().toISOString(),
    notification: true,
  },
];

export const crystalsSeed = [
  {
    id: 'cr_001',
    name: 'Ametista',
    properties: ['Calma', 'Intuizione'],
    chakra: ['Terzo Occhio'],
    description: 'Supporta il sonno e aiuta a chiarire le idee.',
  },
  {
    id: 'cr_002',
    name: 'Quarzo Rosa',
    properties: ['Amore', 'Gentilezza'],
    chakra: ['Cuore'],
    description: 'Perfetto per rituali di autocompassione.',
  },
];

export const horoscopeSeed = {
  sign: 'Bilancia',
  title: 'Equilibrio luminoso',
  message: 'Oggi il tuo equilibrio è un faro per chi ti circonda.',
};

export const moonPhaseSeed = {
  name: 'Luna crescente',
  meaning: 'Espansione e nuovi inizi. Ottimo momento per fissare intenzioni.',
};
