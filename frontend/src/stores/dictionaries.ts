import { defineStore, acceptHMRUpdate } from "pinia";

async function apiAirportsDictionary() {
  return fetch("api/dictionary?type=airports").then((data) => data.json());
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
        const airports = await apiAirportsDictionary();

        this.$patch({
          airports,
        });
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
