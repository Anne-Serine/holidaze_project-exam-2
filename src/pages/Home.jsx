import { ParkingCircle, PawPrint, Utensils, Wifi } from "lucide-react";

function Home() {
  return (
    <>
      <div className="bg-daze-bg py-2">
        <div className="container flex items-center">
          <div className="md:w-[9vw] md:h-[60vh]">
            <img
              src="/assets/holidaze_hero-text.svg"
              className="h-full"
              alt="Holidaze decoration text"
            />
          </div>
          <div className="md:w-[100vw] md:h-[60vh]">
            <img
              src="/assets/hero-img.jpg"
              className="h-full w-full object-cover"
              alt="hero image"
            />
          </div>
        </div>
      </div>
      <hr className="h-10 bg-daze-white" />
      <div className="container mt-5">
        <h2 className="">Search venues</h2>- - -{/* search component */}
      </div>
      <div className="bg-daze-white py-2">
        <div className="container flex justify-center gap-10">
          <button className="flex flex-col items-center">
            <Utensils />
            Breakfast
          </button>
          <button className="flex flex-col items-center">
            <Wifi />
            Wifi
          </button>
          <button className="flex flex-col items-center">
            <ParkingCircle />
            Parking
          </button>
          <button className="flex flex-col items-center">
            <PawPrint />
            Pets
          </button>
        </div>
      </div>
      <div className="container my-5">
        <h2>Newest venues</h2>- - -{/* List of venues */}
      </div>
      <div className="bg-daze-white">
        <section className="container relative flex items-center justify-center h-[50vh]">
          {/* Full width background image */}
          <div className="w-full h-full py-5">
            <img
              src="/assets/most-visited-img.jpg"
              alt="a pool and sunbeds by the ocean"
              className="w-full h-full object-cover "
            />
          </div>
          {/* Left side: overlay text content */}
          <div className="absolute left-0 top-0 h-[50vh] p-7 px-2">
            <div className="asymatrical-left bg-daze-accent text-daze-white p-8 pe-16 h-full">
              <h2 className="text-2xl md:text-3xl mb-5">Most visited venues</h2>
              <p>
                Check out the most popular venues that everyone is visiting
                right now!
              </p>
              -{/* Button component */}
            </div>
          </div>
        </section>
      </div>
      <div className="container my-5">
        <h2>Best offer</h2>- - -{/* Filtered best offer venues */}
      </div>
    </>
  );
}

export default Home;
