import { create } from "zustand";
// import { persist } from "zustand/middleware";

const useVenues = create((set) => ({
  allVenues: [],
  error: null,
  getAllVenues: async (id = '') => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues${id ? `/${id}` : ''}`
      ).then(
        (result) => result.json()
      );
      if (id) {
        return response.data;
      } else {
        set(() => ({
          allVenues: response.data,
        }));
      }
    } catch (error) {
      console.log("Error fetching venues", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
}));

export default useVenues;



// const use

// export const useVenueStore = create(
//   persist(
//     (set) => ({
//       venues: [],
      
//     })
//   )
// )