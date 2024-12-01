import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useProfile } from "./useProfile";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {},
      token: null, // Store the token when user logs in
      error: null, // Error handling
      registeredUser: "",

      registerUser: async (userData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}auth/register`,
            {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
              }),
            }
          ).then((result) => result.json());

          if (response.data) {
            set(() => ({
              registeredUser: "Successfully registered",
            }));
            window.location.href = "/login";
          }
        } catch (error) {
          console.log("Error fetching venues", error);
          set(() => ({
            error: error.message,
          }));
        }
      },

      updateUser: (venueManager, bio, avatar) =>
        set((state) => ({
          user: {
            ...state.user,
            venueManager:
              venueManager !== undefined
                ? venueManager
                : state.user.venueManager,
            bio: bio ? bio : state.user.bio,
            avatar: avatar ? avatar : state.user.avatar,
          },
        })),

      resetRegisteredUser: () => set({ registeredUser: "" }),

      loginUser: async (userData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}auth/login/?_holidaze=true`,
            {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify({
                email: userData.email,
                password: userData.password,
              }),
            }
          ).then((result) => result.json());
          if (response.data) {
            const { accessToken, ...user } = response.data;
            set(() => ({
              token: accessToken,
              user: user,
            }));
            const queryParams = new URLSearchParams(window.location.search);
            const venueId = queryParams.get("venueId");
            venueId
              ? (window.location.href = `/venue/${venueId}`)
              : (window.location.href = "/");
          }
        } catch (error) {
          console.log("Error fetching venues", error);
          set(() => ({
            error: error.message,
          }));
        }
      },

      logoutUser: () => {
        localStorage.clear();
        set({
          token: null,
          user: {},
        });
        window.location.href = "/login";
      },
    }),
    {
      name: "auth-storage", // Name in localStorage,
    }
  )
);

const useVenues = create((set, get) => ({
  allVenues: [],
  allSearchedVenues: [],
  currentPage: 1,
  error: null,

  getAllVenues: async (id = "") => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues${
          id ? `/${id}` : ""
        }?_owner=true&_bookings=true&sort=created&limit=24&page=${
          get().currentPage
        }`
      ).then((result) => result.json());
      if (id) {
        if (response.errors) {
          set(() => ({
            error: "Could not find venue: " + response.errors[0].message,
          }));
        } else {
          set(() => ({
            error: null,
          }));
          return response.data;
        }
      } else {
        if (response.errors) {
          set(() => ({
            error: "Could not find venues: " + response.errors[0].message,
          }));
        }
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
  nextPage: () => {
    set(() => ({
      currentPage: get().currentPage + 1,
    }));
  },
  previousPage: () => {
    set(() => ({
      currentPage: get().currentPage > 1 ? get().currentPage - 1 : 1,
    }));
  },
  createVenue: async (venueData, id, type) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues${id ? `/${id}` : ""}`,
        {
          method: type,
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: venueData.venueName,
            ...(venueData.image && {
              media: [
                {
                  url: venueData.image,
                  alt: venueData.venueName,
                },
              ],
            }),

            description: venueData.description,
            price: venueData.price,
            maxGuests: venueData.maxGuests,
            meta: {
              wifi: venueData.wifi,
              parking: venueData.parking,
              breakfast: venueData.breakfast,
              pets: venueData.pets,
            },
            location: {
              address: venueData.address,
              city: venueData.city,
              zip: venueData.zipCode,
              country: venueData.country,
            },
          }),
        }
      ).then((result) => result.json());
      if (response.errors) {
        set(() => ({
          error: response.errors[0].message,
        }));
      }
      console.log(response);
      if (response.data) {
        set(() => ({
          error: null,
        }));
        window.location.href = `/venue/${response.data.id}`;
      }
    } catch (error) {
      console.log("Error creating a venue", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
  deleteVenue: async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      if (response.ok) {
        set(() => ({
          error: null,
        }));
        // Update the state to remove the deleted booking
        useProfile.getState().getVenuesAndBookingsByProfile();
        useVenues.getState().getAllVenues();
      } else {
        set(() => ({
          error: response.errors[0].message,
        }));
      }
    } catch (error) {
      console.log("Error deleting the venue", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
  searchVenues: async (query) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues/search?q=${query}`
      );
      const data = await response.json();
      set(() => ({ allSearchedVenues: data }));
    } catch (error) {
      console.error("Error fetching search results:", error);
      set(() => ({ error: error.message }));
    }
  },
}));

export default useVenues;

export const useBookings = create((set) => ({
  bookingsByProfile: [],
  error: null,

  createBooking: async (startDate, endDate, guests, venueId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/bookings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dateFrom: startDate.toISOString(),
            dateTo: endDate.toISOString(),
            guests: Number(guests),
            venueId: venueId,
          }),
        }
      ).then((result) => result.json());
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Error creating a booking", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
}));
