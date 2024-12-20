import { create } from "zustand";
import { useAuthStore } from "./Store";

export const useProfile = create((set, get) => ({
  bookingsByProfile: [],
  venuesByProfile: [],
  error: null,
  loading: false,

  updateProfile: async (userData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/profiles/${
          useAuthStore.getState().user.name
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            venueManager:
              userData.venueManager !== undefined
                ? userData.venueManager
                : await useAuthStore.getState().user.venueManager,
            bio: userData.bio,
            avatar: userData.avatar,
          }),
        }
      ).then((result) => result.json());
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
      set(() => ({
        error: error.message,
      }));
    }
  },
  getBookingsByProfile: async () => {
    set({ loading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/profiles/${
          useAuthStore.getState().user.name
        }?_bookings=true&_venues=true`,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
        }
      ).then((result) => result.json());
      if (response.data) {
        set(() => ({
          loading: false,
          bookingsByProfile: response.data.bookings.sort(
            (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
          ),
        }));
      }
    } catch (error) {
      set(() => ({
        loading: false,
        error: error.message,
      }));
    }
  },
  getVenuesByProfile: async () => {
    set({ loading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/profiles/${
          useAuthStore.getState().user.name
        }/venues?_bookings=true`,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
        }
      ).then((result) => result.json());
      if (response.data) {
        set(() => ({
          loading: false,
          venuesByProfile: response.data.sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          ),
        }));
      }
    } catch (error) {
      set(() => ({
        loading: false,
        error: error.message,
      }));
    }
  },
  deleteBooking: async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      if (response.ok) {
        // Update the state to remove the deleted booking
        const getBookings = get().getBookingsByProfile;
        await getBookings();
        set((state) => ({
          bookingsByProfile: state.bookingsByProfile.filter(
            (booking) => booking.id !== id
          ),
        }));
      } else {
        console.error("Failed to delete the booking");
      }
    } catch (error) {
      set(() => ({
        error: error.message,
      }));
    }
  },
}));
