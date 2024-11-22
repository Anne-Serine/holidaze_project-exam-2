import {
  MapPin,
  ParkingCircle,
  PawPrint,
  Pen,
  Trash,
  Utensils,
  Wifi,
} from "lucide-react";
import { useParams } from "react-router-dom";
import Calendar from "../components/features/Calendar";
import Carousel from "../components/features/Carousel";
import { useEffect, useState } from "react";
import useVenues from "../hooks/Store";

function SingleVenue() {

  const [venueData, setVenueData] = useState(null);
  const getAllVenues = useVenues((state) => state.getAllVenues);
  const { id } = useParams();

  useEffect(() => {
    async function fetchSingleVenue() {
      const data = await getAllVenues(id);
      setVenueData(data);
    }
    { id && 
      fetchSingleVenue();
    }
  }, [getAllVenues, id]);

  return (
    <div>
      <div className="bg-daze-primary-op10">
        <div className="container flex justify-end gap-8 text-sm">
          <button className="flex gap-1 items-center">
            <Pen />
            <p>Edit</p>
          </button>
          <button className="flex gap-1 items-center">
            <Trash color="#8B0404" />
            <p className="text-daze-red">Delete</p>
          </button>
        </div>
      </div>
      <section className="container">
        {/* Image carousel */}
        <Carousel imageUrls={venueData && venueData.media} />
      </section>
      <div className="bg-daze-white flex justify-center gap-5 py-2">
        <ul className="container flex justify-start gap-6 font-medium text-sm ">
          <li>
            <a href="#description"
              className="hover:border-b hover:border-daze-accent"
            >
              DESCRIPTION
            </a>
          </li>
          <li>
            <a href="#amenities"
              className="hover:border-b hover:border-daze-accent"
            >
              AMENITIES
            </a>
          </li>
          <li>
            <a href="#location"
              className="hover:border-b hover:border-daze-accent"
            >
              LOCATION
            </a>
          </li>
        </ul>
      </div>
      {venueData && 
      <section id="description" className="container flex flex-wrap gap-5 justify-center md:justify-between ">
        <div className="py-5 max-w-[38rem] min-w-[18rem] flex-1 w-full">
          <h1 className="leading-none mb-2">{venueData.name}</h1>
          {venueData.rating ? (
            <p className="flex gap-1 items-center"><img src="/assets/star.svg" alt="star icon" />{venueData.rating}</p>
          ) : (
            <p className="flex gap-1 items-center text-xs font-light italic"><img src="/assets/star.svg" alt="star icon" />No rating yet</p>
          )}
          <div className="my-8 flex gap-3 items-center">
            <div className="size-10 rounded-full overflow-hidden">
              <img
              src={venueData.owner.avatar.url}
              alt="" 
              className="object-cover h-full w-full"
              />
            </div>
            <p>{venueData.owner.name}</p>
          </div>
          <div className="flex justify-between py-3 text-sm italic">
            <span className="flex flex-col">Created: <span>{new Date(venueData.created).toLocaleDateString()}</span></span>
            <span className="flex flex-col">Updated: <span>{new Date(venueData.updated).toLocaleDateString()}</span></span>
          </div>
          <p>{venueData.description}</p>
          <div className="mt-5">
            <span className="font-semibold text-xl">{venueData.price} NOK</span><span>/ Night</span>
          </div>
        </div>
        <div className="py-5 flex flex-col gap-4">
          <Calendar venueData={venueData} venueId={id} />
        </div>
      </section>
      }
      <div id="amenities" className="bg-daze-gray py-2 text-daze-white">
        <div className="container">
          <div className="flex items-center gap-4">
            <p className="whitespace-nowrap">Amenities:</p>
            {venueData && 
              <div className="flex gap-8 items-center justify-center text-sm flex-1">
                {venueData.meta.breakfast ? (
                  <span className="flex flex-col items-center"><Utensils color="#C78D70" />Breakfast</span>
                ) : (
                  <span className="flex flex-col items-center text-neutral-500"><Utensils color="#737373" />Breakfast</span>
                )}
                {venueData.meta.wifi ? (
                  <span className="flex flex-col items-center"><Wifi color="#C78D70" />Wifi</span>
                ) : (
                  <span className="flex flex-col items-center text-neutral-500"><Wifi color="#737373" />Wifi</span>
                )}
                {venueData.meta.parking ? (
                  <span className="flex flex-col items-center"><ParkingCircle color="#C78D70" />Parking</span>
                ) : (
                  <span className="flex flex-col items-center text-neutral-500"><ParkingCircle color="#737373" />Parking</span>
                )}
                {venueData.meta.pets ? (
                  <span className="flex flex-col items-center"><PawPrint color="#C78D70" />Pets</span>
                ) : (
                  <span className="flex flex-col items-center text-neutral-500"><PawPrint color="#737373" />Pets</span>
                )}
              </div>
            }
          </div>
        </div>
      </div>
      {venueData && 
        <section id="location" className="bg-daze-accent ">
          <div className="container-hug md:relative flex flex-wrap items-center justify-center md:h-[50vh]">
            {/* Full width background image */}
            <div className="w-full h-full">
              <img
                src="/assets/map.jpg"
                alt="Location map"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Left side: overlay text content */}
            <div className="md:absolute md:left-0 md:top-0 md:h-[50vh] md:max-w-[30rem] w-full">
              <div className="container asymatrical-left bg-daze-accent text-daze-gray h-full">
                <div className="p-10 ps-0">
                  <h2 className="text-2xl md:text-3xl mb-5">Location</h2>
                  <div className="max-w-[80%] mb-10">
                    <p className="flex flex-col gap-1">
                      <span><MapPin /></span>
                      <span>{venueData.location.address}</span>
                      <span>{venueData.location.zip}{venueData.location.city}</span>
                      <span className="mt-2">{venueData.location.country}</span>
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  );
}

export default SingleVenue;
