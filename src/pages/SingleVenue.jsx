import {
  MapPin,
  ParkingCircle,
  PawPrint,
  Pen,
  Trash,
  Utensils,
  Wifi,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Calendar from "../components/features/Calendar";
import Button from "../components/common/Buttons";

function SingleVenue() {
  return (
    <div>
      <div className="bg-daze-primary-op10">
        <div className="container flex justify-end gap-10">
          <button className="flex gap-2 items-center">
            <Pen />
            <p>Edit venue</p>
          </button>
          <button className="flex gap-2">
            <Trash color="#8B0404" />
            <p className="text-daze-red">Edit venue</p>
          </button>
        </div>
      </div>
      <section className="container">
        Image carousel
        {/* Image carousel */}
      </section>
      <div className="bg-daze-white flex justify-center gap-5 py-2">
        <ul className="container flex justify-start gap-6 font-medium text-sm ">
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-daze-accent"
                  : "hover:border-b hover:border-daze-accent"
              }
            >
              DESCRIPTION
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-daze-accent"
                  : "hover:border-b hover:border-daze-accent"
              }
            >
              FACILITIES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-daze-accent"
                  : "hover:border-b hover:border-daze-accent"
              }
            >
              POLICIES
            </NavLink>
          </li>
        </ul>
      </div>
      <section className="container flex flex-wrap gap-5 justify-between">
        <div className="py-5 max-w-[40rem] min-w-[18rem] flex-1 w-full">
          <h1 className="leading-none mb-2">Venue name</h1>
          <p className="flex gap-1 items-center"><img src="/public/assets/star.svg" alt="star icon" />4.8</p>
          <div className="my-8 flex gap-3 items-center">
            <div className="size-10 rounded-full overflow-hidden">
              <img
              src="/public/assets/hero-img.jpg"
              alt="" 
              className="object-cover h-full w-full"
              />
            </div>
            <p>Profile name of the creator</p>
          </div>
          <div className="flex justify-between py-3">
            <span>Created: Date</span>
            <span>Updated: Date</span>
          </div>
          <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo maiores inventore repellat accusantium. Praesentium exercitationem deserunt, in sit iste incidunt cum minima iure nihil eaque sequi similique dolorum ducimus quod?</p>
          <div className="mt-5">
            <span className="font-semibold text-xl">Price NOK</span><span>/ Night</span>
          </div>
        </div>
        <div className="py-5 flex flex-col gap-4">
          <div>
            <Calendar />
          </div>
          <div>
            <Button text="Book" />
          </div>
        </div>
      </section>
      <div className="bg-daze-gray py-2 text-daze-white">
        <div className="container">
          <div className="flex gap-8 items-center justify-center">
            <span className="flex flex-col items-center"><Utensils color="#FFFFFF" />Breakfast</span>
            <span className="flex flex-col items-center"><Wifi color="#FFFFFF" />Wifi</span>
            <span className="flex flex-col items-center"><ParkingCircle color="#FFFFFF" />Parking</span>
            <span className="flex flex-col items-center"><PawPrint color="#FFFFFF" />Pets</span>
          </div>
        </div>
      </div>
      <section className="md:relative flex flex-wrap items-center justify-center md:h-[50vh]">
          {/* Full width background image */}
          <div className="w-full h-full">
            <img
              src="/public/assets/hero-img.jpg"
              alt="Location map"
              className="w-full h-full object-cover "
            />
          </div>
          {/* Left side: overlay text content */}
          <div className="md:absolute md:left-0 md:top-0 md:h-[50vh] md:max-w-[30rem] w-full">
            <div className="container asymatrical-left bg-daze-accent text-daze-gray  h-full">
              <div className="p-10">
                <h2 className="text-2xl md:text-3xl mb-5">Location</h2>
                <dl className="max-w-[80%] mb-10">
                  <dt className="flex flex-col gap-1">
                    <dd><MapPin /></dd>
                    <dd>Skogstua 12</dd>
                    <dd>3256 Nissedal</dd>
                    <dd className="mt-2">Norway</dd>
                  </dt>
                </dl>
              </div>
              
            </div>
          </div>
        </section>
    </div>
  );
}

export default SingleVenue;
