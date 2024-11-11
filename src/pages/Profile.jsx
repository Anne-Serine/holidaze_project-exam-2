import { Pen, Settings } from "lucide-react";
import BookingCard from "../components/features/BookingCard";
import VenueCard from "../components/features/VenueCard";

function Profile() {
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
            <h1 className="text-2xl sm:text-4xl py-3 sm:py-0">Name Nameson</h1>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <p className="">email@address.no</p>
              <button className="flex gap-2 items-center">
                <Settings size={20} /> Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="container-hug flex flex-wrap">
        <div className="mt-10 m-2 mb-4 flex-1 min-w-[40%]">
          <h2>Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, quam?
            Eaque distinctio quos repudiandae facere recusandae! Asperiores
            laborum sequi quos nobis voluptatibus quo dolorem repellendus eos
            odio, amet porro qui! Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Perferendis esse exercitationem excepturi cumque
            natus ducimus modi aspernatur nesciunt blanditiis odit, voluptatem
            magnam rerum cum non perspiciatis eaque, nulla unde eveniet!
          </p>
        </div>
        <div className="bg-daze-primary-op10 flex flex-col p-10 text-center justify-center mx-2 md:max-w-[24rem] w-full">
          <h2 className="pb-5">Want to manage venues?</h2>
          <p className="pb-5">Apply for venue manager rights</p>
          <button className="bg-white p-3">APPLY</button>
        </div>
      </section>
      <hr className="h-10 bg-daze-white" />
      <div className="container my-5 grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] gap-5 ">
        <div className="">
          <h2>
            My upcoming bookings <span>( 3 )</span>
          </h2>
          <div className="flex flex-col gap-2">
            {/* Component */}
            <BookingCard />
            <BookingCard />
            <BookingCard />
          </div>
        </div>
        <div>

        </div>
      </div>
      
      {/* Admin profile  */}

      <div className="my-5">
        <h2 className="container">My venues</h2>
        <div className="bg-daze-primary-op10">
          <div className="container flex justify-center gap-10">
            <button className="flex gap-2 items-center">
              <Pen />
              <p>Edit venue</p>
            </button>
          </div>
        </div>
        <div className="container cards-grid">
          {/* Venue cards components */}
         <VenueCard />
         <VenueCard />
         <VenueCard />
        </div>
        <div className="bg-daze-primary-op10">
          <div className="container grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] gap-5">
            <div className="">
              {/* Calendar component */}
              --- calendar component ---
              <p>---</p>
              <p>---</p>
              <p>---</p>
              <p>---</p>
              <p>---</p>
              <p>---</p>
            </div>
            <div className="">
              <h2>Reservations on my venues</h2>
              <div className="flex flex-col gap-2">
                {/* Reservations cards */}
                <BookingCard type="dark" />
                <BookingCard type="dark" />
                <BookingCard type="dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
