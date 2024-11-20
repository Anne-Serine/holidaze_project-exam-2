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
                'content-Type': 'application/json',
              },
              body: JSON.stringify({ "name": userData.name, "email": userData.email, "password": userData.password })
            }
          ).then(
            (result) => result.json()
          );

          if ( response.data) {
            set(() => ({
              registeredUser: "Successfully registered",
            }));
            window.location.href = "/login"
          }

        } catch (error) {
          console.log("Error fetching venues", error);
          set(() => ({
            error: error.message,
          }));
        }
      },

      resetRegisteredUser: () => 
        set({ registeredUser: "" }),

      loginUser: async (userData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}auth/login`,
            {
              method: "POST",
              headers: {
                'content-Type': 'application/json',
              },
              body: JSON.stringify({ "email": userData.email, "password": userData.password })
            }
          ).then(
            (result) => result.json()
          );

          if ( response.data) {
            
            const { accessToken, ...user } = response.data;
            set(() => ({
              token: accessToken,
              user: user,
            }));
            window.location.href = "/"
          }

        } catch (error) {
          console.log("Error fetching venues", error);
          set(() => ({
            error: error.message,
          }));
        }
      },

      logoutUser: () => 
        set({token: null}),
    }),
    {
      name: "auth-storage", // Name in localStorage,
    }
  )
);


const useVenues = create((set) => ({
  allVenues: [],
  error: null,
  
  getAllVenues: async (id = '') => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/venues${id ? `/${id}?_owner=true&_bookings=true` : ''}`
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

export const useBookings = create((set) => ({
  allBookings: [],
  error: null,
  getAllBookings: async (id = '') => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}holidaze/bookings${id ? `/${id}?_customer=true&_venue=true` : ''}`,
        {
          method: "GET",
          headers: {
            'content-Type': 'application/json',
          },
        }
      ).then(
        (result) => result.json()
      );
      if (id) {
        return response.data
      } else {
        set(() => ({
          allBookings: response.data,
        }));
      }  
    } catch (error) {
      console.log("Error fetching venues", error);
      set(() => ({
        error: error.message,
      }))
    }
  }
}))


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