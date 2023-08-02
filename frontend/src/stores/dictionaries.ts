import { defineStore, acceptHMRUpdate } from "pinia";

async function apiAirportsDictionary() {
  // it is better to use some client for queries like axios, this will make the code cleaner, but now I decided not to add it
  return fetch("api/dictionary?type=airports");
}

export type Airport = {
  iataCode: string;
  city: string;
  country: string;
};

interface IDictionariesState {
  airports: Airport[];
  isLoading: boolean;
  error: null | string;
}

const defaultState: IDictionariesState = {
  airports: [],
  isLoading: true,
  error: null,
};

export const useDictionariesStore = defineStore({
  id: "dictionaries",
  state: () => defaultState,

  actions: {
    async getAirports() {
      this.$patch({ isLoading: true });
      try {
        const response = await apiAirportsDictionary();

        if (!response.ok) {
          const error = JSON.parse(await response.text());
          this.$patch({
            error,
          });
        } else {
          const airports = await response.json();
          this.$patch({
            airports,
          });
        }
      } catch (error) {
        this.$patch({
          error: "Server Error",
        });
      } finally {
        this.$patch({ isLoading: false });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDictionariesStore, import.meta.hot)
  );
}
