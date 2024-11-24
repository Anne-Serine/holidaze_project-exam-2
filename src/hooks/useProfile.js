import { create } from "zustand";
import { useAuthStore } from "./Store";

const name = useAuthStore.getState().user.name;
const token = useAuthStore.getState().token;

export const useProfile = create((set) => ({
  error: null,
  
  updateProfile: async (venueManager) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/profiles/${name}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            venueManager: venueManager,
          }),
        }
      ).then((result) => result.json());
      console.log(response)
      if (response.data) {
        const updateVenueManager = useAuthStore.getState().updateVenueManager;
        updateVenueManager(venueManager);
        return response.data;
      }
    } catch (error) {
      console.log("Error updating profile", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
}));