import { Pen, Settings } from "lucide-react";
import BookingCard from "../components/features/BookingCard";
// import Calendar from "../components/features/Calendar";
import useVenues, { useAuthStore } from "../hooks/Store";
import { useEffect } from "react";
import Button from "../components/common/Buttons";
import { useProfile } from "../hooks/useProfile";

function Profile() {

  const user = useAuthStore((state) => state.user);
  const allVenues = useVenues((state) => state.allVenues);
  const getAllVenues = useVenues((state) => state.getAllVenues);
  const bookingsByProfile = useVenues((state) => state.bookingsByProfile);
  const updateProfile = useProfile((state) => state.updateProfile);

  useEffect(() => {
    getAllVenues();
  }, [getAllVenues]);

  console.log(bookingsByProfile)
  console.log(allVenues)

  return (
    <div>
      <div className="relative bg-daze-gray md:h-[200px]">
        <div className="container relative flex flex-col sm:flex-row items-center md:items-start md:h-full">
          <div className="relative sm:absolute sm:top-10 size-[8rem] sm:size-[12rem] outline outline-daze-white outline-1 -outline-offset-[10px]">
            <img
              src="/assets/hero-img.jpg"
              className=" h-full w-full object-cover "
              alt="profile picture"
            />
          </div>
          <div className="max-h-[200px] sm:ml-[14rem] sm:pt-28 text-daze-white flex flex-col w-full justify-end text-center sm:text-start max-w-[18rem] sm:max-w-full">
            <h1 className="text-2xl sm:text-4xl py-3 sm:py-0">{user.name}</h1>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <p>{user.email}</p>
              <button className="flex gap-2 items-center">
                <Settings size={20} /> Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="container-hug flex flex-wrap">
        <div className="mt-10 m-2 mb-4 flex-1 min-w-[40%]">
          <h2 className="text-2xl">About me</h2>
          <p>
            {user.bio ? (
              user.bio
            ) : (
              "No bio added yet"
            )}
          </p>
        </div>
        <div className="bg-daze-primary-op10 flex flex-col p-10 text-center justify-center mx-2 md:max-w-[24rem] w-full">
          {user.venueManager ? (
            <>
              <h2 className="pb-5">You are currently venue manager</h2>
              <p className="pb-5">Still need the rights?</p>
              <Button text="Remove" onClick={() => updateProfile(!user.venueManager)} />
            </>
          ) : (
            <>
              <h2 className="pb-5">Want to manage venues?</h2>
              <p className="pb-5">Apply for venue manager rights</p>
              <Button text="Apply" onClick={() => updateProfile(!user.venueManager)} />
            </>
          )}
          
        </div>
      </section>
      <hr className="h-10 bg-daze-white" />
      <div className="container my-5 grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] gap-5 ">
        <div className="">
          <h2>
            My upcoming bookings <span>( { bookingsByProfile.length} )</span>
          </h2>
          <div className="flex flex-col gap-2">
            {bookingsByProfile && bookingsByProfile.length > 0 ? (
              bookingsByProfile.map((booking) => (
                
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <p>No bookings yet.</p>
            )
            }
          </div>
        </div>
        <div>

        </div>
      </div>
      
      {/* Admin profile  */}
      {user.venueManager && 
        <div className="my-5">
          <h2 className="container">My venues</h2>
          <div className="bg-daze-primary-op10">
            <div className="container flex justify-center gap-10">
              <button className="flex gap-2 items-center">
                <Pen />
                <p>Create new venue</p>
              </button>
            </div>
          </div>
          <div className="container cards-grid">
            {/* Venue cards components */}
          
          </div>
          <div className="bg-daze-primary-op10">
            <div className="container grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] gap-5">
              <div className="">
                {/* Calendar component to show upcoming reservations from other people */}
              {/* <Calendar venueData={} /> */}
              </div>
              <div className="">
                <h2>Reservations on my venues</h2>
                <div className="flex flex-col gap-2">
                  {/* Reservations cards */}
                
                </div>
              </div>
            </div>
          </div>
        </div>
      }
            
    </div>
  );
}

export default Profile;
