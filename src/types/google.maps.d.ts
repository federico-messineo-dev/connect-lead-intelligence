declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps.places {
  class Autocomplete {
    constructor(inputElement: HTMLInputElement, options?: {
      types?: string[];
      fields?: string[];
      componentRestrictions?: { country: string };
    });
    getPlace(): { description: string; place_id: string } | undefined;
    addListener(eventType: string, handler: () => void): void;
  }

  class AutocompleteService {
    getPlacePredictions(
      request: { input: string; types?: string[]; componentRestrictions?: { country: string } },
      callback: (predictions: { place_id: string; description: string }[] | null, status: string) => void
    ): void;
  }

  const PlacesServiceStatus: {
    OK: string;
    OVER_QUERY_LIMIT: string;
    REQUEST_DENIED: string;
    INVALID_REQUEST: string;
    UNKNOWN_ERROR: string;
    ZERO_RESULTS: string;
  };
}

export {};