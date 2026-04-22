import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Lead {
  id: number;
  name: string;
  location: string;
  category: string;
  score: number;
  status: string | null;
  description: string;
  image: string;
  savedAt?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  stats?: {
    ig: { label: string; value: string; trend: string | null; type: 'error' | 'ok' | 'warning' };
    web: { label: string; value: string; trend: string | null; type: 'error' | 'ok' | 'warning' };
    gmb: { label: string; value: string; trend: string | null; type: 'error' | 'ok' | 'warning' };
  };
}

export interface SearchHistoryEntry {
  id: string;
  location: string;
  categories: string[];
  keywords: string;
  resultsCount: number;
  leadsFound: Lead[];
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'api_limit' | 'system' | 'lead';
  read: boolean;
  createdAt: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  workspace: string;
}

interface AppStore {
  savedLeads: Lead[];
  selectedLeadId: number | null;
  user: UserProfile;
  notifications: Notification[];
  hasSearched: boolean;
  searchResultsCount: number;
  isSearching: boolean;
  searchPerformedThisSession: boolean;
  showSearchCompletePopup: boolean;
  selectedSearchCategories: string[];
  selectedSearchLocation: string;
  todaySearchesCount: number;
  todayLeadsCount: number;
  searchHistory: SearchHistoryEntry[];
  toggleSaveLead: (lead: Lead) => void;
  isSaved: (leadId: number) => boolean;
  setSelectedLead: (leadId: number | null) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  setHasSearched: (value: boolean) => void;
  setSearchResultsCount: (count: number) => void;
  setSearchPerformedThisSession: (value: boolean) => void;
  setIsSearching: (value: boolean) => void;
  setShowSearchCompletePopup: (value: boolean) => void;
  setSelectedSearchCategories: (categories: string[]) => void;
  setSelectedSearchLocation: (location: string) => void;
  setTodayStats: (searches: number, leads: number) => void;
  resetTodayStats: () => void;
  addToSearchHistory: (entry: Omit<SearchHistoryEntry, 'id' | 'createdAt'>) => void;
  deleteFromSearchHistory: (id: string) => void;
  clearSearchHistory: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      savedLeads: [],
      selectedLeadId: null,
      hasSearched: false,
      searchResultsCount: 0,
      isSearching: false,
      searchPerformedThisSession: false,
      showSearchCompletePopup: false,
      selectedSearchCategories: [],
      selectedSearchLocation: '',
      todaySearchesCount: 1,
      todayLeadsCount: 0,
      searchHistory: [],
      user: {
        name: 'Mario Rossi',
        email: 'mario.rossi@example.com',
        avatar: 'https://picsum.photos/seed/mario/200/200',
        workspace: 'Connect Agency'
      },
      notifications: [
        {
          id: '1',
          title: 'Avviso Limite API',
          message: 'Hai raggiunto l\'80% del limite giornaliero dei token. Potresti aver bisogno di aggiornare il piano a breve.',
          type: 'api_limit',
          read: false,
          createdAt: new Date().toISOString()
        }
      ],
      toggleSaveLead: (lead) => {
        const isSaved = get().savedLeads.some((l) => l.id === lead.id);
        if (isSaved) {
          set({ savedLeads: get().savedLeads.filter((l) => l.id !== lead.id) });
        } else {
          set({ savedLeads: [...get().savedLeads, { ...lead, savedAt: new Date().toISOString() }] });
        }
      },
      isSaved: (leadId) => get().savedLeads.some((l) => l.id === leadId),
      setSelectedLead: (leadId) => set({ selectedLeadId: leadId }),
      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Math.random().toString(36).substring(7),
            read: false,
            createdAt: new Date().toISOString()
          },
          ...state.notifications
        ]
      })),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      clearNotifications: () => set({ notifications: [] }),
      setHasSearched: (value) => set({ hasSearched: value }),
      setSearchResultsCount: (count) => set({ searchResultsCount: count }),
      setSearchPerformedThisSession: (value) => set({ searchPerformedThisSession: value, hasSearched: value }),
      setIsSearching: (value) => set({ isSearching: value }),
      setShowSearchCompletePopup: (value) => set({ showSearchCompletePopup: value }),
      setSelectedSearchCategories: (categories) => set({ selectedSearchCategories: categories }),
      setSelectedSearchLocation: (location) => set({ selectedSearchLocation: location }),
      setTodayStats: (searches, leads) => set({ todaySearchesCount: Math.min(searches, 5), todayLeadsCount: leads }),
      resetTodayStats: () => set({ todaySearchesCount: 0, todayLeadsCount: 0 }),
      addToSearchHistory: (entry) => set((state) => ({
        searchHistory: [
          {
            ...entry,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString()
          },
          ...state.searchHistory
        ]
      })),
      deleteFromSearchHistory: (id) => set((state) => ({
        searchHistory: state.searchHistory.filter(e => e.id !== id)
      })),
      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'connect-lead-intelligence-storage',
    }
  )
);
