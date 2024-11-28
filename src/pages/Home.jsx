import VenueCard from "../components/features/VenueCard";
import Button from "../components/common/Buttons";
import Search from "../components/common/Search";
import useVenues from "../hooks/Store";
import { useEffect } from "react";

function Home() {

  const venues = useVenues((state) => state.allVenues);
  const getAllVenues = useVenues((state) => state.getAllVenues);

  useEffect(() => {
    getAllVenues();
  }, [getAllVenues])

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
      <hr className="h-10 bg-daze-primary-op10" />
      <div className="container">
        <h2>Search venues</h2>
        <Search />
      </div>
      <hr className="h-10 mt-10 bg-daze-primary-op10" />
      <section className="container">
        <h2>Newest venues</h2>
        {/* List of venues */}
        <div className="cards-grid">
          {venues.length > 0 &&
            venues.map((venue) => (
              <VenueCard 
                key={venue.id}
                id={venue.id}
                image={venue.media}
                name={venue.name}
                price={venue.price}
                rating={venue.rating}
                meta={venue.meta}
              />
            ))}
         
        </div>
        <div className="flex justify-center mt-10 mb-5">
          {/* --- Pagination button --- */}
          <Button text="More >" />
        </div>
      </section>

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
              <p className="max-w-[80%] mb-10">
                Check out the most popular venues that everyone is visiting
                right now!
              </p>
              <Button text="View" />
            </div>
          </div>
        </section>
      </div>
      <section className="container">
        <h2>Best offer</h2>
        {/* Filtered best offer venues */}
        <div className="cards-grid ">
          <VenueCard />
        </div>
        <div className="flex justify-center mt-10 mb-5">
          {/* --- Pagination button --- */}
          <Button text="More >" />
        </div>
      </section>
    </>
  );
}

export default Home;
