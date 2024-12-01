import VenueCard from "../components/features/VenueCard";
import Button from "../components/common/Buttons";
import Search from "../components/common/Search";
import useVenues from "../hooks/Store";
import { useEffect } from "react";
import { GridLoader } from "react-spinners";

function Home() {
  const venues = useVenues((state) => state.allVenues);
  const getAllVenues = useVenues((state) => state.getAllVenues);
  const nextPage = useVenues((state) => state.nextPage);
  const previousPage = useVenues((state) => state.previousPage);
  const currentPage = useVenues((state) => state.currentPage);
  const error = useVenues((state) => state.error);

  useEffect(() => {
    getAllVenues();
  }, [getAllVenues, currentPage]);

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
        {error && (
          <div className="container">
            <div
              role="alert"
              className="p-2 border border-daze-red bg-red-200 max-w-max text-daze-red"
            >
              {error}
            </div>
          </div>
        )}
        {venues && venues.length === 0 ? (
          <div className="flex justify-center p-5"><GridLoader color="#2F4A52" /></div>
        ) : (
        <div className="cards-grid">
          {venues && venues.length > 0 &&
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
        )
        }
        <div className="flex mx-auto max-w-max gap-8 mt-10 mb-5">
          {/* --- Pagination button --- */}
          <Button text="< Prev" onClick={previousPage} />
          <Button text="Next >" onClick={nextPage} />
        </div>
      </section>

      <div className="bg-daze-white">
        <section className="container relative flex items-center justify-center md:h-[50vh]">
          {/* Full width background image */}
          <div className="w-full h-full py-5 hidden md:block">
            <img
              src="/assets/most-visited-img.jpg"
              alt="a pool and sunbeds by the ocean"
              className="w-full h-full object-cover "
            />
          </div>
          {/* Left side: overlay text content */}
          <div className="md:absolute left-0 top-0 md:h-[50vh] p-7 px-2">
            <div className="asymatrical-left bg-daze-accent text-daze-white p-8 pe-16 h-full">
              <h2 className="text-2xl md:text-3xl mb-5">Get started</h2>
              <p className="max-w-[80%] mb-10">
                Register and login to book, create and manage venues.
              </p>
              <Button text="Register" url="/register" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
