import { create } from "zustand";
import { useAuthStore } from "./Store";

const name = useAuthStore.getState().user.name;
const token = useAuthStore.getState().token;

export const useProfile = create((set) => ({
  error: null,
  
  updateProfile: async (userData) => {
    console.log(userData)
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
            venueManager: userData.venueManager !== undefined ? userData.venueManager : await useAuthStore.getState().user.venueManager,
            bio: userData.bio,
            avatar: userData.avatar,
          }),
        }
      ).then((result) => result.json());
      console.log(response)
      if (response.errors) {
        set(() => ({
          error: response.errors[0].message,
        }));
      }
      if (response.data) {
        const updateUser = useAuthStore.getState().updateUser;
        updateUser(userData.venueManager, userData.bio, userData.avatar);
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