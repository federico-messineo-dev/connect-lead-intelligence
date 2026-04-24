import { Lead } from './store';

const generateLeads = (): Lead[] => {
  const romaLeads: Lead[] = [];
  const categories = ['Ristorazione', 'Servizi IT', 'Retail', 'Salute & Benessere', 'Automotive'];
  const locations = ['Roma Centro', 'Roma Prati', 'Roma EUR', 'Roma Tuscolana', 'Roma San Giovanni', 'Roma Trionfale', 'Roma Monteverde', 'Roma Testaccio', 'Roma Monti', 'Roma San Lorenzo'];
  const names = {
    'Ristorazione': ['Trattoria da Enzo', 'Pizzeria Roma', 'Ristorante Giardino', 'Enoteca Trastevere', 'Bar delle Dolomiti', 'Forno del Popolo', 'Osteria dei Gelsomini', 'Taco Latino', 'Sushi Roma', 'Caffè Letterario'],
    'Servizi IT': ['Web Agency Roma', 'Tech Solutions', 'Digital Fast', 'Innovazione Web', 'Sviluppo Roma', 'Cloud Servizi', 'Data Systems', 'Cyber Security Pro', 'App Maker Roma', 'Software House'],
    'Retail': ['Moda Vintage', 'Sneakers Store', 'Casa Design', 'Bio Store', 'Profumeria Centro', 'Ottica Roma', 'Gioielleria', 'Cartoleria', 'Fiorista', 'Abbigliamento'],
    'Salute & Benessere': ['Palestra Fitness', 'Centro Estetico', 'Studio Dentale', 'Parafarmacia', 'Massaggi Roma', 'Osteopata', 'Nutrizionista', 'Spa Centro', 'Pilates Studio', 'Yoga Roma'],
    'Automotive': ['Auto Roma', 'Car Service', 'Gomme Roma', 'Elettrauto', 'Carrozzeria', 'Motorshop', 'Auto Usate', 'Moto Roma', 'Revisioni', 'Gommista']
  };

  let id = 1;
  for (const cat of categories) {
    const catNames = names[cat as keyof typeof names];
    for (let j = 0; j < catNames.length; j++) {
      romaLeads.push({
        id: id++,
        name: catNames[j],
        location: locations[j % locations.length],
        category: cat,
        score: Math.floor(Math.random() * 70) + 20,
        status: Math.random() > 0.5 ? 'Nuovo' : Math.random() > 0.5 ? 'Hot Lead' : null,
        description: `Attività locale con potenziale di crescita. Analisi completata con suggerimenti personalizzati per migliorare la visibilità digitale.`,
        image: `https://picsum.photos/seed/${cat}${j}/600/400`,
        mobile: `320${Math.floor(Math.random() * 9000000 + 1000000)}`,
        phone: `06${Math.floor(Math.random() * 9000000 + 1000000)}`,
        email: `info@${catNames[j].toLowerCase().replace(/\s/g, '')}.it`,
        stats: {
          ig: { label: 'Instagram', value: Math.random() > 0.5 ? 'Attiva' : 'Inattiva', trend: Math.random() > 0.5 ? 'Post recenti' : 'Da migliorare', type: Math.random() > 0.5 ? 'ok' : 'error' },
          web: { label: 'Sito Web', value: Math.random() > 0.5 ? 'Presente' : 'Mancante', trend: Math.random() > 0.5 ? 'Ottimizzato' : 'Da aggiornare', type: Math.random() > 0.5 ? 'ok' : 'warning' },
          gmb: { label: 'Google Maps', value: Math.random() > 0.5 ? 'Attivo' : 'Assente', trend: Math.random() > 0.5 ? 'Recensioni' : 'Da attivare', type: Math.random() > 0.5 ? 'ok' : 'error' }
        }
      });
    }
  }
  return romaLeads;
};

export const ALL_LEADS: Lead[] = generateLeads();