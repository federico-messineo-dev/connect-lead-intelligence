import { Lead } from './store';

export const ALL_LEADS: Lead[] = [
  {
    id: 1,
    name: 'Caffè Torinese',
    location: 'Torino Centro',
    category: 'Ristorazione',
    score: 42,
    status: 'Nuovo',
    description: 'Attività con presenza social debole. Ultimo post risale a 3 mesi fa. Ottimo potenziale per servizi di Social Media Management.',
    image: 'https://picsum.photos/seed/cafe/600/400',
    mobile: '3201234567',
    phone: '0112345678',
    email: 'info@caffetorinese.it',
    stats: {
      ig: { label: 'Instagram', value: 'Debole', trend: 'Ultimo post: 3 mesi fa', type: 'error' },
      web: { label: 'Sito Web', value: 'Lento', trend: 'Non mobile friendly', type: 'error' },
      gmb: { label: 'Google Maps', value: 'Presente', trend: 'Senza orari aggiornati', type: 'warning' }
    }
  },
  {
    id: 2,
    name: 'TechFlow Srl',
    location: 'Milano Sud',
    category: 'Servizi IT',
    score: 68,
    status: null,
    description: 'Sito web non responsive. Campagne Ads attive ma con landing page obsolete. Contatto suggerito per restyling.',
    image: 'https://picsum.photos/seed/tech/600/400',
    mobile: '3339876543',
    email: 'contatti@techflow.it',
    stats: {
      ig: { label: 'Instagram', value: 'Media', trend: 'Engagement basso', type: 'warning' },
      web: { label: 'Sito Web', value: 'Obsoleto', trend: 'Landing page non ottimizzata', type: 'error' },
      gmb: { label: 'Google Maps', value: 'Ottima', trend: 'Buone recensioni', type: 'ok' }
    }
  },
  {
    id: 3,
    name: 'Boutique Sartoriale',
    location: 'Roma Prati',
    category: 'Retail',
    score: 21,
    status: 'Hot Lead',
    description: 'Nessuna presenza su Google My Business. Instagram inattivo. Alta probabilità di conversione per pacchetto visibilità locale.',
    image: 'https://picsum.photos/seed/fashion/600/400',
    phone: '061234567',
    stats: {
      ig: { label: 'Instagram', value: 'Inattivo', trend: 'Zero post nel 2024', type: 'error' },
      web: { label: 'Sito Web', value: 'Mancante', trend: 'Dominio libero', type: 'error' },
      gmb: { label: 'Google Maps', value: 'Assente', trend: 'Nessuna scheda attiva', type: 'error' }
    }
  },
  {
    id: 4,
    name: 'Fitness World',
    location: 'Bologna',
    category: 'Salute & Benessere',
    score: 85,
    status: 'Nuovo',
    description: 'Palestra con ottime recensioni ma sito web lento. Necessità di un sistema di booking moderno.',
    image: 'https://picsum.photos/seed/gym/600/400',
    mobile: '3471122334',
    phone: '051998877',
    email: 'hello@fitnessworld.it',
    stats: {
      ig: { label: 'Instagram', value: 'Ottima', trend: '10k+ followers', type: 'ok' },
      web: { label: 'Sito Web', value: 'Lento', trend: 'TTFB > 2s', type: 'error' },
      gmb: { label: 'Google Maps', value: 'Ottima', trend: '4.8 stelle', type: 'ok' }
    }
  },
  {
    id: 5,
    name: 'Osteria del Porto',
    location: 'Genova',
    category: 'Ristorazione',
    score: 35,
    status: null,
    description: 'Ristorante storico senza menu digitale. Presenza Facebook abbandonata dal 2022.',
    image: 'https://picsum.photos/seed/food/600/400',
    phone: '010554433',
    stats: {
      ig: { label: 'Instagram', value: 'Assente', trend: 'Account non trovato', type: 'error' },
      web: { label: 'Sito Web', value: 'Assente', trend: 'Solo pagina FB vecchia', type: 'error' },
      gmb: { label: 'Google Maps', value: 'Base', trend: 'Foto caricate da utenti', type: 'warning' }
    }
  },
  {
    id: 6,
    name: 'Innova Hub',
    location: 'Venezia',
    category: 'Servizi IT',
    score: 72,
    status: 'Hot Lead',
    description: 'Start-up in crescita con brand identity poco definita. Cercano consulenza marketing.',
    image: 'https://picsum.photos/seed/office/600/400',
    mobile: '3456677889',
    email: 'info@innovahub.ve',
    stats: {
      ig: { label: 'Instagram', value: 'Buona', trend: 'Consistente', type: 'ok' },
      web: { label: 'Sito Web', value: 'Moderno', trend: 'Poche conversioni', type: 'warning' },
      gmb: { label: 'Google Maps', value: 'Debole', trend: 'Poche recensioni', type: 'warning' }
    }
  },
  {
    id: 7,
    name: 'Mobili Design',
    location: 'Firenze',
    category: 'Retail',
    score: 55,
    status: 'Nuovo',
    description: 'Showroom di lusso. Foto su Instagram di bassa qualità che non valorizzano i prodotti.',
    image: 'https://picsum.photos/seed/furniture/600/400',
    mobile: '3335544332',
    phone: '055123456',
    email: 'clienti@mobilidesign.it',
    stats: {
      ig: { label: 'Instagram', value: 'Bassa Qualità', trend: 'Foto sgranate', type: 'error' },
      web: { label: 'Sito Web', value: 'Discreto', trend: 'Catalogo non aggiornato', type: 'warning' },
      gmb: { label: 'Google Maps', value: 'Ottima', trend: 'Sempre aperto', type: 'ok' }
    }
  },
  {
    id: 8,
    name: 'Auto Prestige',
    location: 'Napoli',
    category: 'Automotive',
    score: 48,
    status: null,
    description: 'Concessionaria senza campagne Lead Generation attive. Bassissima visibilità su Google Maps.',
    image: 'https://picsum.photos/seed/car/600/400',
    mobile: '3391112223',
    phone: '081223344',
    stats: {
      ig: { label: 'Instagram', value: 'Inconsistente', trend: 'Post rari', type: 'warning' },
      web: { label: 'Sito Web', value: 'Base', trend: 'Manca e-commerce', type: 'warning' },
      gmb: { label: 'Google Maps', value: 'Inesistente', trend: 'Scheda non rivendicata', type: 'error' }
    }
  },
  {
    id: 9,
    name: 'Pet Paradise',
    location: 'Palermo',
    category: 'Retail',
    score: 62,
    status: 'Hot Lead',
    description: 'Negozio per animali con e-commerce non funzionante. Perdita di vendite online stimata alta.',
    image: 'https://picsum.photos/seed/dog/600/400',
    mobile: '3408877665',
    email: 'shop@petparadise.pa',
    stats: {
      ig: { label: 'Instagram', value: 'Buona', trend: 'Community attiva', type: 'ok' },
      web: { label: 'Sito Web', value: 'Rotto', trend: 'Checkout error 500', type: 'error' },
      gmb: { label: 'Google Maps', value: 'Media', trend: 'Orari errati', type: 'warning' }
    }
  }
];
