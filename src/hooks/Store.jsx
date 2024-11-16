import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

const useVenues = create((set) => ({
  allVenues: [],
  error: null,
  getAllVenues: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues`
      ).then(
        (result) => result.json()
      );
      set(() => ({
        allVenues: response.data,
      }));
    } catch (error) {
      console.log("Error fetching venues", error)
    }
  },
}));

export default useVenues;

// const useVenueStore = create(
//   persist(
//     (set) => ({
//       venues: [],
//     })
//   )
// )