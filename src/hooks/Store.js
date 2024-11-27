import { create } from "zustand";
import { persist } from "zustand/middleware";

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

      updateUser: (venueManager, bio, avatar) => set((state) => ({
        user: {
          ...state.user, 
          venueManager: venueManager !== undefined ? venueManager : state.user.venueManager,
          bio: bio ? bio : state.user.bio,
          avatar: avatar ? avatar : state.user.avatar,
        }
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
              ? window.location.href=`/venue/${venueId}` 
              : window.location.href = "/";
          }
        } catch (error) {
          console.log("Error fetching venues", error);
          set(() => ({
            error: error.message,
          }));
        }
      },

      logoutUser: () => {
        console.log("Logging out...");
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

const useVenues = create((set) => ({
  allVenues: [],
  bookingsByProfile: [],
  venuesByProfile: [],
  error: null,

  getAllVenues: async (id = "") => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues${
          id ? `/${id}` : ""
        }?_owner=true&_bookings=true&sort=created`
      ).then((result) => result.json());
      if (id) {
        return response.data;
      } else {
        console.log(response.data)
        set(() => ({
          allVenues: response.data,
          bookingsByProfile: response.data.flatMap((venue) => {
            if (venue.bookings) {
              return venue.bookings
                .filter((b) => b.customer.name === useAuthStore.getState().user.name)
                .map((booking) => ({
                  ...booking,
                  venueName: venue.name, // Add the venue's name to each booking
                  venueUrl: venue.media[0].url,
                  rating: venue.rating,
                }));
            }
            return []; // Ensure flatMap doesn't add undefined values
          }),
          venuesByProfile: response.data.filter((venue) => {
            return venue.owner.name === useAuthStore.getState().user.name
          })
        }));
      }
    } catch (error) {
      console.log("Error fetching venues", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
  createVenue: async (venueData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: venueData.venueName,
            media: [{
              url: venueData.image,
              alt: venueData.venueName,
            }],
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
              zip: venueData.zipCode.toString(),
              country: venueData.country,
            }
          }),
        }
      ).then((result) => result.json());
      if (response.data) {
        console.log(response)
        return response.data;
      }
    } catch (error) {
      console.log("Error creating a venue", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
}));

export default useVenues;

export const useBookings = create((set) => ({
  bookingsByProfile: [],
  error: null,
  // getBookingsByProfile: async () => {
  //   try {
  //     const allVenues = useVenues.getState().allVenues;
  //     const currentUser = useAuthStore.getState().user;
  
  //     // Map through all venues and attach venue info to each booking
  //     const filteredBookings = allVenues
  //       .flatMap((venue) =>
  //         venue.bookings.map((booking) => ({
  //           ...booking,
  //           venueName: venue.name, // Add venue name
  //           venueLocation: venue.location, // Add venue location
  //           venueImage: venue.image, // Add any other venue details you need
  //         }))
  //       )
  //       .filter((booking) => booking.customer.name === currentUser.name); // Filter bookings by current user
  
  //     // Update Zustand state
  //     set({ bookingsByProfile: filteredBookings });
  //   } catch (error) {
  //     console.error("Error in getBookingsByProfile:", error);
  //     set({ error: "Failed to fetch bookings by profile." });
  //   }
  // },
  
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
      console.log(response)
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
        const getAllVenues = useVenues.getState().getAllVenues;
        await getAllVenues();
        set((state) => ({
          bookingsByProfile: state.bookingsByProfile.filter(
            (booking) => booking.id !== id
          ),
        }));
      } else {
        console.error("Failed to delete the booking");
      }
    } catch (error) {
      console.log("Error deleting the booking", error);
      set(() => ({
        error: error.message,
      }));
    }
  },
   
}));

// export const useProfilesStore = create((set) => ({
//   allProfiles: [],
//   error: null,
//   getAllProfiles: async (id = '') => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}holidaze/profiles?_bookings=true&_venues=true`,
//         {
//           method: "GET",
//           headers: {
//             'content-Type': 'application/json'
//           },
//         }
//       ).then(
//         (result) => result.json()
//       );
//       if (id) {
//         return response.data;
//       } else {
//         set(() => ({
//           allProfiles: response.data,
//           error: null,
//         }));
//       }

//     } catch (error) {
//       console.log("Error fetching venues", error);
//       set(() => ({
//         error: error.message,
//       }));
//     }
//   }
// }))

// createToken: async (url, credentials) => {
//   try {
//     const response = await axios.post(url, credentials);
//     set({
//       accessToken: response.data.accessToken,
//       apiKey: response.data.apiKey,
//       error: null,
//     });
//   } catch (error) {
//     set({
//       error: error.response ? error.response.data.message: "Failed to create token"
//     });
//   }
// },

//   clearToken: () => set({ accessToken: null, apiKey: null, error: null }),
// }),
// {
//   name: 'auth-storage',
//   getStorage: () => localStorage,
// }
