import { defineStore, acceptHMRUpdate } from "pinia";

async function apiFlights(origin: string, destination: string) {
  return fetch(
    `api/promotions/priceoffers/ond/:${origin}/:${destination}`
  ).then((data) => data.json() as Promise<Flight[]>);
}

type DateString = `${number}-${number}-${number}`;

interface Flight {
  origin: string;
  destination: string;
  departureDate: DateString;
  returnDate: DateString;
  seatAvailability: number;
  price: number;
}

interface FlightsState {
  origin: string | null;
  destination: string | null;
  isLoading: boolean;
  error: string | null;
  flights: Flight[];
  searchBtnClicked: boolean;
}

const defaultState: FlightsState = {
  origin: null,
  destination: null,
  isLoading: true,
  error: null,
  flights: [],
  searchBtnClicked: false,
};

export const useFlightsStore = defineStore({
  id: "flights",
  state: () => defaultState,

  actions: {
    async getAirports() {
      this.$patch({ isLoading: true });
      try {
        const flights = await apiFlights(
          this.$state.origin!,
          this.$state.destination!
        );

        await new Promise((res) => setTimeout(res, 2000));

        this.$patch({
          flights,
        });
      } catch (error) {
        this.$patch({
          error: "Server Error",
        });
      } finally {
        this.$patch({ isLoading: false });
      }
    },

    setOrigin(newValue: string) {
      this.$patch({ origin: newValue });
    },
    setDestination(newValue: string) {
      this.$patch({ destination: newValue });
    },

    setSearchBtnClicked(value: boolean) {
      this.$patch({ searchBtnClicked: value });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFlightsStore, import.meta.hot));
}
